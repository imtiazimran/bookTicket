import { Button, Card, Typography } from "keep-react";
import { useFetchDataQuery } from "../redux/api/apiSlice";
import { TCoach } from "../utils/types/types";
import Container from "../utils/Container";
import { Link } from "react-router-dom";



const AllCoach = () => {

    

  const { data, isLoading } = useFetchDataQuery({});
  const { coach } = data || {};

  console.log(coach);
 
  return (
    <Container>
      <Typography variant="heading-1">All Coach</Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        coach?.map((c : TCoach) => (
          <Card key={c._id}>
            <Card.Header>
              <image
                src={c.image}
                alt="image"
                width={600}
                height={400}
              />
            </Card.Header>
            <Card.Content className="space-y-3">
              <Card.Title>{c.name}</Card.Title>
              <Card.Description>
                <p className="text-sm">Number: {c.number}</p>
                <p className="text-sm">Departure: {c.departure}</p>
                <p className="text-sm">Price: {c.price}</p>
                <p className="text-sm">Seats: {c.seats}</p>
              </Card.Description>
              <Button size="sm" color="primary">
                <Link to={`/booking/${c._id}`}>Book Now</Link>
              </Button>
            </Card.Content>
          </Card>
        ))
      )}
    </Container>
  );
};

export default AllCoach;
