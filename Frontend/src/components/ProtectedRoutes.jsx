import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; 

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  // console.log(user);

  const token = localStorage.getItem("token");

  if (!user) {
    console.log("user not found.")
    return <Navigate to="/authpage" replace />;
  }

  return children;
};

export default ProtectedRoute;
