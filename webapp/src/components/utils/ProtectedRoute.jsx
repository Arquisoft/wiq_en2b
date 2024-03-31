import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthManager from "../auth/AuthManager";

const authManager = new AuthManager();

const ProtectedRoutes = () => {
  if (!authManager.isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
