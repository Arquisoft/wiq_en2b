import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthManager from "../auth/AuthManager";
import { CircularProgress } from "@chakra-ui/react";

const ProtectedRoutes = () => {

  const navigate = useNavigate();
  const [hasLoaded, setHasLoaded] = useState(false);
  const authManager = useRef(new AuthManager());

  useEffect(() => {
    async function protectRoute() {
      let isLoggedIn = await authManager.current.isLoggedIn();
      setHasLoaded(true);
      if (!(isLoggedIn)) {
        navigate("/login");
      }
    }

    protectRoute();
  }, [navigate])
  return <>{hasLoaded ? <Outlet /> : <CircularProgress isIndeterminate />}</>
}

export default ProtectedRoutes;
