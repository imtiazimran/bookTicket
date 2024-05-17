import { Button } from "keep-react";
import { useState, useEffect } from "react";
import {
  useGetCaochQuery,
  useUnSelectSeatMutation,
  useUpdateSeatMutation,
} from "../redux/api/apiSlice";
import { useParams } from "react-router-dom";
import Container from "../utils/Container";
import { BookedSeat, TCoach } from "../utils/types/types";
import Swal from "sweetalert2";
import Loading from "../utils/Loading";

interface Params extends Record<string, string | undefined> {
  id: string;
}

export const Booking = () => {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(true);
  const [coachData, setCoachData] = useState<TCoach | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading, refetch }: any = useGetCaochQuery(id);
  const [selectedForUnBook, setSelectedForUnBook] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setCoachData(data.coach);
      setLoading(false);
    }
  }, [data]);


  const [updateSeatMutation, { isLoading: mutationLoading }] =
    useUpdateSeatMutation();
  const [unSelectSeat, { isLoading: unSelectSeatLoading }] =
    useUnSelectSeatMutation();
  const initializeSeatStatus = (totalSeats: number): string[] => {
    return Array.from({ length: totalSeats }, () => "available");
  };

  const [seatStatus, setSeatStatus] = useState<string[]>(
    initializeSeatStatus(coachData ? coachData.seats * 4 : 0)
  );

  const handleSeatSelection = (seatName: string) => {
    const seatIndex = selectedSeats.indexOf(seatName);
    const newSelectedSeats = [...selectedSeats];
    const newSeatStatus = [...seatStatus];

    if (seatIndex === -1) {
      newSelectedSeats.push(seatName);
      newSeatStatus[getSeatIndex(seatName)] = "selected";
    } else {
      newSelectedSeats.splice(seatIndex, 1);
      newSeatStatus[getSeatIndex(seatName)] = "available";
    }

    setSelectedSeats(newSelectedSeats);
    setSeatStatus(newSeatStatus);
  };

  const handleUnBooking = async () => {
    try {
      const response = await unSelectSeat({
        id,
        seatNumbers: [...selectedForUnBook],
      });

      if ("error" in response) {
        console.error("Error updating seats:", response.error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating seats",
        });
      } else {
        setSelectedForUnBook([]);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Seats updated successfully",
        });
        refetch();
      }
    } catch (error) {
      console.error("An error occurred while updating seats:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating seats",
      });
    }
  };

  const handleBooking = async () => {
    if (selectedForUnBook.length > 0) {
      handleUnBooking();
      return;
    }
    try {
      const response = await updateSeatMutation({
        id,
        bookedSeats: [
          ...selectedSeats,
          ...(coachData ? coachData.bookedSeats : []),
        ],
      });

      if ("error" in response) {
        console.error("Error updating seats:", response.error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating seats",
        });
      } else {
        setSelectedSeats([]);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Seats updated successfully",
        });
        // refetch()
      }
    } catch (error) {
      console.error("An error occurred while updating seats:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating seats",
      });
    }
  };

  const getSeatIndex = (seatName: string): number => {
    const row = seatName.charCodeAt(0) - 65;
    const col = parseInt(seatName.slice(1)) - 1;
    return row * 4 + col;
  };

  // useEffect(() => {
  //   // const ws = new WebSocket("wss://bookticketbackend.onrender.com:3000");
  //   // ws.onmessage = (event) => {
  //   //   // Handle WebSocket message
  //   //   const message = event.data;
  //   //   console.log("Received message from WebSocket:", message);
  //   //   if (message === "success") {
  //   //     refetch();
  //   //   }
  //   //   // refetch();
  //   // };
  //   // return () => {
  //   //   // Cleanup WebSocket connection
  //   //   ws.close();
  //   // };
  // }, [refetch]);

  if (loading || mutationLoading || isLoading || unSelectSeatLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <Button className="w-full my-7" type="button" onClick={handleBooking}>
        {selectedForUnBook.length > 0 ? "Cancel Booking" : "Book"}
      </Button>
      <div className="flex flex-wrap justify-center items-center gap-2">
        {selectedForUnBook.length > 0 &&
          selectedForUnBook.map((seat) => <p>{seat}</p>)}
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4 pb-5">
          {Array.from(
            { length: coachData ? coachData.seats : 0 },
            (_, index) => {
              const seatName = getSeatName(index);
              const status = seatStatus[index];
              const bookedSeat = (
                coachData?.bookedSeats as BookedSeat[] | undefined
              )?.find((seat) => seat?.seatNumber?.includes(seatName));

              // Ensure bookedSeat is properly typed
              if (typeof bookedSeat === "string") {
                // Handle the case where bookedSeat is incorrectly typed as string
                return null;
              }

              return (
                <div
                  key={index}
                  className={`w-10 h-10 rounded ${
                    selectedForUnBook.includes(seatName)
                      ? "bg-purple-400"
                      : bookedSeat
                      ? "bg-red-500" // Booked seat color
                      : status === "selected"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }
        text-center`}
                  onClick={() => handleSeatSelection(seatName)}
                  onDoubleClick={
                    bookedSeat // Allow unbooking only for booked seats
                      ? () =>
                          setSelectedForUnBook((prev) => [...prev, seatName])
                      : () => {}
                  }
                >
                  {bookedSeat ? ( // Display user's image if booked
                    <img
                      src={bookedSeat.userId.picture} // Assuming the user's image is stored in the 'picture' field
                      alt={bookedSeat.userId.name} // Assuming the user's name is stored in the 'name' field
                      className="w-full h-full rounded"
                    />
                  ) : (
                    seatName
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>
    </Container>
  );
};

const getSeatName = (index: number): string => {
  const row = String.fromCharCode(65 + Math.floor(index / 4));
  const col = (index % 4) + 1;
  return `${row}${col}`;
};
