import "./App.css";
import { NavbarComponent } from "./common/Nav";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="">
      <NavbarComponent />
      <Outlet/>
    </div>
  );
}

export default App;
