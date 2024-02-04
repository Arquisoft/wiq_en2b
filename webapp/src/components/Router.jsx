import React from "react";
import Root from "../pages/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Layout from "./Layout";

const router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },{
      path: "/login",
      element: <Login />
      },
      {
      path: "/register",
      element: <Register />
      }
    ]
  }
];

export default router;