import { Button } from "keep-react";
import { useState, useEffect } from "react";
import { useGetCaochQuery, useUpdateSeatMutation } from "../redux/api/apiSlice";
import { useParams } from "react-router-dom";
import Container from "../utils/Container";
import { TCoach } from "../utils/types/types";
import Swal from "sweetalert2";

interface Params extends Record<string, string | undefined> {
  id: string;
}

export const Booking = () => {
  const { id } = useParams<Params>();
  const [loading, setLoading] = useState(true);
  const [coachData, setCoachData] = useState<TCoach | null>(null);
  const { data, isLoading } = useGetCaochQuery(id);

  useEffect(() => {
    if (data) {
      setCoachData(data.coach);
      setLoading(false);
    }
  }, [data]);

  const [updateSeatMutation, { isLoading: mutationLoading }] = useUpdateSeatMutation();
  const initializeSeatStatus = (totalSeats: number): string[] => {
    return Array.from({ length: totalSeats }, () => "available");
  };

  const [seatStatus, setSeatStatus] = useState<string[]>(initializeSeatStatus(coachData ? coachData.seats * 4 : 0));

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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

  const handleBooking = async () => {
    try {
      const response = await updateSeatMutation({
        id,
        bookedSeats: [...selectedSeats, ...(coachData ? coachData.bookedSeats : [])],
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

  if (loading || mutationLoading || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Button className="w-full my-7" type="button" onClick={handleBooking}>
        Confirm
      </Button>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4 pb-5">
          {Array.from({ length: coachData ? coachData.seats : 0 }, (_, index) => {
            const seatName = getSeatName(index);
            const status = seatStatus[index];
            return (
              <div
                key={index}
                className={`w-10 h-10 rounded p-4 ${
                  coachData && coachData.bookedSeats.includes(seatName)
                    ? "bg-red-500"
                    : status === "selected"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                } text-center`}
                onClick={() => handleSeatSelection(seatName)}
              >
                {seatName}
              </div>
            );
          })}
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
