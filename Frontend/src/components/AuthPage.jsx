import React, { useState, useContext, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { AuthContext } from "./Authcontext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


// const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const toggleAuth = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-full bg-[#EEEEEE] px-4 ">
      <h2 className="text-3xl font-bold  text-center mb-10 mt-4">
        {showLogin ? "Login to Bloggest" : "Create an Account"}
      </h2>
      {showLogin ? <Login /> : <Signup />}
      <button
        onClick={toggleAuth}
        className="pb-4 text-[#00ADB5] font-semibold underline hover:text-[#007d82] transition cursor-pointer"
      >
        {showLogin
          ? "New user? Create an account"
          : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default AuthPage;
