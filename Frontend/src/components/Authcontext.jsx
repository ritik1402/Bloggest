import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("token"));
  

  const login = (userData) => {
    console.log("===========userdata ------------",userData)
    setUser(userData.token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios
  //       .get("http://localhost:8000/api/auth/profile", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((res) => {
  //         if (res.data.success) {
  //           setUser(res.data.user);
  //         } else {
  //           localStorage.removeItem("token");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Token validation failed:", err.message);
  //         localStorage.removeItem("token");
  //         setUser(null);
  //       });
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
