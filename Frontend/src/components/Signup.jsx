import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { validatePassword,  validateEmail,  ConfirmPass,} from "../utils/validation";
import {toast} from "react-hot-toast";

const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = userData;
  
    const emailResult = validateEmail(email);
    if (!emailResult.valid) {
      toast.error(emailResult.message, {
        style: { background: "red", color: "white" },
      });
      return;
    }

    const passResult = validatePassword(password);
    if (!passResult.valid) {
      toast.error(passResult.message, {
        style: { background: "red", color: "white" },
      });
      return;
    }

   
    const confirmResult = ConfirmPass(password, confirmPassword);
    if (!confirmResult.valid) {
      toast.error(confirmResult.message, {
        style: { background: "red", color: "white" },
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem("userData", JSON.stringify({ email }));
        login({ email });
        toast.success("Signup successful!", {
          style: { background: "green", color: "#white" },
        });
        setTimeout(() => navigate("/"), 1200);
      } else {
        toast.error(response.data.message || "Signup failed.", {
          style: { background: "red", color: "white" },
        });
      }
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error("Something went wrong. Please try again.", {
        style: { background: "red", color: "white" },
      });
    }
  };

  return (
    <div className="min-h-[70vh] flex justify-center items-center bg-[#EEEEEE] px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-white shadow-xl rounded-2xl border-t-8 border-[#00ADB5] p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#222831]">
          Create Your Account
        </h2>
        <form className="space-y-6" onSubmit={registerUser}>
          <div>
            <label className="block text-lg mb-2 text-[#393E46]">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300"
              value={userData.email}
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
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2 text-[#393E46]">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ADB5] transition-all duration-300"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#00ADB5] text-[#EEEEEE] text-lg font-semibold py-3 rounded-xl shadow-md transition-transform duration-300 cursor-pointer"
          >
            Signup
          </motion.button>
         
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
