import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./context/userContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useUser();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
