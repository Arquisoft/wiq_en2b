import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AuthManager from "../auth/AuthManager";
import { CircularProgress } from "@chakra-ui/react";

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
  }, [navigate])
  return <>{hasLoaded ? <Outlet /> : <CircularProgress isIndeterminate />}</>
}

export default ProtectedRoutes;
