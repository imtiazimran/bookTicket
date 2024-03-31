import { Button } from "keep-react";
import { Link } from "react-router-dom";
import AllCoach from "../AllCoach";

const Layout = () => {
  return (
    <div>
      <Button className="w-36 mx-auto my-4">
        <Link to="/addCoach" className="text-white text-center">
          New Coach
        </Link>
      </Button>
      <AllCoach />
    </div>
  );
};

export default Layout;
