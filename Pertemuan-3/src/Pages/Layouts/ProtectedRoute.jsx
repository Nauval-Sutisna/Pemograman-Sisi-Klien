import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStateContext } from "@/Pages/Layouts/Utils/Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  //const isLoggedIn = localStorage.getItem("user");
  const { user } = useAuthStateContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;