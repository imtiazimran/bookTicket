import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Booking } from "./bookSeat/Booking.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import AllCoach from "./bookSeat/AllCoach.tsx";
import Layout from "./bookSeat/layout/Layout.tsx";
import { AddCoach } from "./bookSeat/AddCoach.tsx";
import axios from "axios";
import { EmptyComponent } from "./utils/Empty.tsx";
import { baseUrl } from "./redux/api/apiSlice.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div>
        <EmptyComponent />
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Layout />,
      },
      {
        path: "/booking",
        element: <AllCoach />,
      },
      {
        path: "/booking/:id",
        element: <Booking />,
        loader: ({ params }) => {
          return axios
            .get(`${baseUrl}/${params.id}`) // Fix the syntax error here
            .then((res) => {
              return res.data;
            });
        },
      },
      {
        path: "/addCoach",
        element: <AddCoach />,
      },
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
