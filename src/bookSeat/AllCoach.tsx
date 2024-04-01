import { useState, useEffect } from "react";
import moment from "moment";
import { Button, Card, Typography } from "keep-react";
import { useFetchDataQuery } from "../redux/api/apiSlice";
import { TCoach } from "../utils/types/types";
import Container from "../utils/Container";
import Loading from "../utils/Loading";

const AllCoach = () => {
  const { data, isLoading } = useFetchDataQuery() as unknown as {
    data: { success: boolean; message: string; coach: TCoach[] };
    isLoading: boolean;
  };

  const [timeRemaining, setTimeRemaining] = useState<string[]>([]);

  useEffect(() => {
    if (data && data.coach) {
      const coachDepartures = data.coach.map((coach: { departure: Date }) =>
        moment(coach.departure)
      );
      const currentTime: moment.Moment = moment();

      const remainingTimes = coachDepartures.map(
        (departureTime: moment.Moment) => {
          const duration = moment.duration(departureTime.diff(currentTime));
          const hours = duration.hours();
          const minutes = duration.minutes();
          return `${hours} hours, ${minutes} minutes`;
        }
      );

      setTimeRemaining(remainingTimes);
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="heading-3">All Coach</Typography>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data &&
            "coach" in data &&
            data.coach.map((coach: TCoach, index: number) => (
              <Card key={coach._id}>
                <Card.Header className="!p-0">
                  <img src={coach.image} alt="image" className="w-full" />
                </Card.Header>
                <Card.Content className="space-y-3">
                  <Card.Title>{coach.name}</Card.Title>
                  <Card.Description>
                    <p className="text-sm">Number: {coach.number}</p>
                    <p className="text-sm">
                      Departure:{" "}
                      {moment(coach.departure).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                    <p className="text-sm">Price: {coach.price}</p>
                    <p className="text-sm">Seats: {coach.seats}</p>
                    <p className="text-sm">
                      Time Remaining: {timeRemaining[index]}
                    </p>
                  </Card.Description>
                  <Button size="sm" color="primary">
                    <a href={`/booking/${coach._id}`}>Book Now</a>
                  </Button>
                </Card.Content>
              </Card>
            ))}
        </div>
      )}
    </Container>
  );
};

export default AllCoach;
