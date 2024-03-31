import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import AuthManager from "../auth/AuthManager";
import { CircularProgress } from "@chakra-ui/react";

const authManager = new AuthManager();

const ProtectedRoutes = () => {

  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    async function protectRoute() {
      let isLoggedIn = await AuthManager.getInstance().isLoggedIn();
      setHasLoaded(true);
      if (!(isLoggedIn)) {
        navigate("/login");
      }
    }

    protectRoute();
  }, [])
  return <>{hasLoaded ? <Outlet /> : <CircularProgress isIndeterminate />}</>
}

export default ProtectedRoutes;
