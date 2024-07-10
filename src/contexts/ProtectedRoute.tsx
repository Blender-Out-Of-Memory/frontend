import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  try {
    const auth = useAuth();
    if (!auth.token) {
      return <Navigate to="/login" />;
    }
    return <Outlet />;
  } catch (error) {
    // Potentially handle errors or log them
    console.error("Error accessing authentication context:", error);
    return <Navigate to="/login" />;
  }
};

export default PrivateRoute
