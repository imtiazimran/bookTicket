import React, { useState } from "react";

export const Booking = () => {
  // Initialize state to manage seat statuses, selected seats, and booked seats
  const [seatStatus, setSeatStatus] = useState<Array<string>>(
    Array(40).fill("available")
  );
  const [selectedSeats, setSelectedSeats] = useState<Array<string>>([]);
  const [bookedSeats, setBookedSeats] = useState<Array<string>>([
    "A1",
    "B3",
    "C2",
    "A4",
  ]);
  // Function to handle seat selection
  const handleSeatSelection = (seatName: string) => {
    const seatIndex = selectedSeats.indexOf(seatName);
    let newSelectedSeats = [...selectedSeats];
    let newSeatStatus = [...seatStatus];

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
  const handleBooking = () => {
    // Update booked seats
    setBookedSeats((prevBookedSeats) => [...prevBookedSeats, ...selectedSeats]);
    // Reset selected seats
    setSelectedSeats([]);
  };

  // Function to get the index of a seat based on its name (e.g., "A1", "B2")
  const getSeatIndex = (seatName: string): number => {
    const row = seatName.charCodeAt(0) - 65; // Convert row letter to index (A = 0, B = 1, ...)
    const col = parseInt(seatName.slice(1)) - 1; // Convert column number to index (1-based to 0-based)
    return row * 4 + col; // Assuming 4 columns per row
  };
  return (
    <div className="w-[80%] mx-auto mb-10">
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-4">
          {seatStatus.map((status, index) => {
            const seatName = getSeatName(index);
            return (
              <Pill
                status={status}
                seatName={seatName}
                booked={bookedSeats}
                key={index + 5}
                onClick={() => handleSeatSelection(seatName)}
              />
            );
          })}
        </div>
      </div>
      <button onClick={handleBooking}>Book Selected Seats</button>
    </div>
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
  console.log(`Rendering seat ${seatName}`);
  let bgColor = "";
  if (booked.includes(seatName)) {
    bgColor = "bg-red-500";
    console.log(`Seat ${seatName} is booked`);
  } else if (status === "selected") {
    bgColor = "bg-yellow-500";
    console.log(`Seat ${seatName} is selected`);
  } else {
    bgColor = "bg-green-500";
    console.log(`Seat ${seatName} is available`);
  }

  // console.log("Seat Name:", seatName);
  // console.log("Booked Seats:", booked);

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
