import React from "react";
import Root from "../pages/Root";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Layout from "./Layout";

const router = [
  {
    path: "/",
    // element: <Layout />,
    children: [
      {
        path: "/",
        element: <Root />,
      },{
      path: "/login",
      element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      }
    ]
  }
];

export default router;