import { Button } from "keep-react";
import {  useState } from "react";
import {
  // useGetCaochQuery,
  useUpdateSeatMutation,
} from "../redux/api/apiSlice";
import { useLoaderData, useParams } from "react-router-dom";
import Container from "../utils/Container";
import { TCoach } from "../utils/types/types";
import Swal from "sweetalert2";

interface Params extends Record<string, string | undefined> {
  id: string;
}

export const Booking = () => {
  const { id } = useParams<Params>();
  const data  = useLoaderData() as TCoach
  // const { coach } = data
  const { seats, bookedSeats } = data?.coach as TCoach;

  const [updateSeatMutation, { isLoading: mutaionLoad }] =
    useUpdateSeatMutation();

  const Loading = mutaionLoad;

  const initializeSeatStatus = (totalSeats: number): string[] => {
    return Array.from({ length: totalSeats }, () => "available");
  };

  const [seatStatus, setSeatStatus] = useState<string[]>(
    initializeSeatStatus(seats * 4) // Adjust if needed based on the layout
  );

  const [selectedSeats, setSelectedSeats] = useState<Array<string>>([]);

  // Function to handle seat selection
  const handleSeatSelection = (seatName: string) => {
    const seatIndex = selectedSeats.indexOf(seatName);
    const newSelectedSeats = [...selectedSeats];
    const newSeatStatus = [...seatStatus];

    if (seatIndex === -1) {
      // Seat is not selected, so add it to selectedSeats array
      newSelectedSeats.push(seatName);
      newSeatStatus[getSeatIndex(seatName)] = "selected";
    } else {
      // Seat is already selected, so remove it from selectedSeats array
      newSelectedSeats.splice(seatIndex, 1);
      newSeatStatus[getSeatIndex(seatName)] = "available";
    }

    // Update state
    setSelectedSeats(newSelectedSeats);
    setSeatStatus(newSeatStatus);
  };
  // Function to handle booking
  // Function to handle booking
  const handleBooking = async () => {
    try {
      // Call the mutate function from the mutation hook
      const response = await updateSeatMutation({
        id,
        bookedSeats: [...selectedSeats, ...bookedSeats],
      });

      // Check if the mutation was successful
      if ("error" in response) {
        // Handle error
        console.error("Error updating seats:", response.error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while updating seats",
        });
      } else {
        // Mutation successful
        setSelectedSeats([]); // Clear selected seats
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Seats updated successfully",
        });
        window.location.reload();
      }
    } catch (error) {
      // Handle any other errors
      console.error("An error occurred while updating seats:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating seats",
      });
    }
  };

  // Function to handle booking

  // Function to get the index of a seat based on its name (e.g., "A1", "B2")
  const getSeatIndex = (seatName: string): number => {
    const row = seatName.charCodeAt(0) - 65; // Convert row letter to index (A = 0, B = 1, ...)
    const col = parseInt(seatName.slice(1)) - 1; // Convert column number to index (1-based to 0-based)
    return row * 4 + col; // Assuming 4 columns per row
  };

  if (Loading || !seats || !id) {
    return <div>Loading...</div>;
  }

  // Inside your component
  return (
    <Container>
      <Button className="w-full my-7" type="button" onClick={handleBooking}>
        Confirm
      </Button>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: seats }, (_, index) => {
            const seatName = getSeatName(index);
            const status = seatStatus[index];
            return (
              <div
                key={index}
                className={`w-10 h-10 rounded p-4 ${
                  bookedSeats.includes(seatName)
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

export const Pill = ({
  status,
  seatName,
  booked,
  onClick,
}: {
  status: string;
  seatName: string;
  booked: string[];
  onClick: () => void;
}) => {
  let bgColor = "";
  if (booked.includes(seatName)) {
    bgColor = "bg-red-500";
  } else if (status === "selected") {
    bgColor = "bg-yellow-500";
  } else {
    bgColor = "bg-green-500";
  }

  return (
    <div>
      <div
        className={`w-10 h-10 rounded p-4 ${bgColor} text-center`}
        onClick={onClick}
      >
        {seatName}
      </div>
    </div>
  );
};

// Function to get the name of a seat based on its index
const getSeatName = (index: number): string => {
  const row = String.fromCharCode(65 + Math.floor(index / 4)); // Convert row index to letter (A, B, C, ...)
  const col = (index % 4) + 1; // Calculate column number (1, 2, 3, 4)
  return `${row}${col}`;
};
