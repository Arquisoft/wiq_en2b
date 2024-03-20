import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

const ProtectedRoutes = () => {
    const [user, setUser]  = useLocalStorage("user", null);

    if (!user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoutes;