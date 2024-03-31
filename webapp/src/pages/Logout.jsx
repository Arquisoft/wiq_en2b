import AuthManager from "components/auth/AuthManager";
import React from "react";
import { useNavigate } from "react-router";

export default function Logout() {
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate("/login");
    }
    
    AuthManager.getInstance().logout().then(() => {
        navigateToLogin();
    });
    return <></>
}