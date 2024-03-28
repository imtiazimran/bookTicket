import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import { Booking } from "./bookSeat/Booking.tsx";
import { Button } from "keep-react";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import AllCoach from "./bookSeat/AllCoach.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Button className="w-28 mx-auto mt-10">
            <Link to="/booking" className="text-white text-center">
              Booking
            </Link>
          </Button>
        ),
      },
      {
        path: "/booking",
        element: <AllCoach/> ,
      },
      {
        path: "/booking/:id",
        element:<Booking /> 
      }
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
