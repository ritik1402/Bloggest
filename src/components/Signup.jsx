import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "./AuthContext";

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

  const handleSignup = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = userData;

    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    localStorage.setItem("userData", JSON.stringify({ email, password }));
    login({ email, password });
    alert("Signup successful!");
    navigate("/");
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
        <form className="space-y-6" onSubmit={handleSignup}>
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
            <label className="block text-lg mb-2 text-[#393E46]">Password</label>
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
