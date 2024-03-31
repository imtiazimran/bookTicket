import "./App.css";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./common/Nav";

function App() {
  return (
    <div className="">
      <NavbarComponent />
      <Outlet/>
    </div>
  );
}

export default App;
