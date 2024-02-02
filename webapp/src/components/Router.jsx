import React from "react";
import {
    createBrowserRouter
  } from "react-router-dom";
import Root from "../pages/Root";
import Login from "../pages/Login";
import Register from "../pages/Register";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    }
  ]);

export default router;