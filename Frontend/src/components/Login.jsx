import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const getToken = () => {
  //   const token = localStorage.getItem("token");
  //   return token;
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        login(response.data);
        toast.success("Login successful!", {
          style: { background: "green", color: "white" },
        });
        setTimeout(() => navigate("/"), 5000);
      } else {
        toast.error(response.data.message || "Invalid credentials", {

          style: { background: "red", color: "white" },
        }
        );
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed. Try again.", {
        style: { background: "red", color: "white" },
      });
    }
  };

  return (
    <div className="min-h-[71vh] flex justify-center items-center bg-[#EEEEEE] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white shadow-2xl rounded-3xl border-t-8 border-[#00ADB5] p-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#222831]">
          Welcome Back!
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-lg mb-2 text-[#393E46]">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 text-[#393E46]">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#00ADB5] text-white text-lg font-semibold py-3 rounded-xl shadow-md transition-transform duration-300 cursor-pointer"
          >
            Login
          </motion.button>
      
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
