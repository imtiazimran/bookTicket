import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Card, Typography } from "keep-react";
import { useFetchDataQuery } from "../redux/api/apiSlice";
import { TCoach } from "../utils/types/types";
import Container from "../utils/Container";

const AllCoach = () => {
  const { data, isLoading } = useFetchDataQuery();
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  useEffect(() => {
    if (data && data.coach) {
      const coachDepartures = data.coach.map((coach: { departure: unknown }) => moment(coach.departure));
      const currentTime = moment();
  
      const remainingTimes = coachDepartures.map((departureTime: { diff: (arg0: unknown) => unknown; }) => {
        const duration = moment.duration(departureTime.diff(currentTime));
        const hours = duration.hours();
        const minutes = duration.minutes();
        return `${hours} hours, ${minutes} minutes`;
      });
  
      setTimeRemaining(remainingTimes);
    }
  }, [data]);
  
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="heading-3">All Coach</Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.coach.map((c: TCoach) => (
          <Card key={c._id}>
            <Card.Header className="!p-0">
              <img src={c.image} alt="image" className="w-full" />
            </Card.Header>
            <Card.Content className="space-y-3">
              <Card.Title>{c.name}</Card.Title>
              <Card.Description>
                <p className="text-sm">Number: {c.number}</p>
                <p className="text-sm">Departure: {moment(c.departure).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className="text-sm">Price: {c.price}</p>
                <p className="text-sm">Seats: {c.seats}</p>
                { <p className="text-sm">Time Remaining: {timeRemaining}</p>}
              </Card.Description>
              <Button size="sm" color="primary">
                <a href={`/booking/${c._id}`}>Book Now</a>
              </Button>
            </Card.Content>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default AllCoach;
