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
import { EmptyComponent } from "./utils/Empty.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
        element: <Booking />
      },
      {
        path: "/addCoach",
        element: <AddCoach />,
      },
    ],
  },
]);

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId} >
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
