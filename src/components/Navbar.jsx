import React, { useState, useContext } from "react";
import { MessageSquarePlus, LogIn, LogOut, Menu, X, BookText } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAddBlog = () => {
    if (user) {
      navigate("/addblog");
    } else {
      navigate("/authpage");
    }
  };

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/authpage");
    }
  };

  const handleHeadClick = () => {
    navigate("/");
  };

  const handleMyBlogs = () => {
    if (user) {
      navigate("/myblogs");
    } else {
      navigate("/authpage");
    }
  };

  return (
    <div className="bg-[#222831] px-6 py-4 flex justify-between items-center relative">
      <motion.h1
        className="text-3xl font-bold text-[#EEEEEE] cursor-pointer"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1, transition: { ease: "anticipate", duration: 1.5 } }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleHeadClick}
      >
        Bloggest
      </motion.h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-8 items-center">
        {user && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { ease: "anticipate", duration: 1.5 } }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleMyBlogs}
          >
            <button className="text-xl font-bold text-[#EEEEEE]">My Blogs</button>
            <BookText color="#e62d2d" />
          </motion.div>
        )}

        {user && (
          <motion.div
            className="flex items-center gap-2"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { ease: "anticipate", duration: 1.5 } }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddBlog}
          >
            <button className="text-xl font-bold text-[#EEEEEE]">Add Blog</button>
            <MessageSquarePlus color="#e62d2d" />
          </motion.div>
        )}

        <motion.div
          className="flex items-center gap-2"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { ease: "anticipate", duration: 1.5 } }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleAuthClick}
        >
          <button className="text-xl font-bold text-[#EEEEEE]">
            {user ? "Logout" : "Login"}
          </button>
          {user ? <LogOut color="#e62d2d" /> : <LogIn color="#e62d2d" />}
        </motion.div>
      </div>

      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X color="#EEEEEE" size={28} /> : <Menu color="#EEEEEE" size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 200, opacity: 0 }}
          className="absolute top-16 right-4 bg-[#393E46] text-white w-52 p-4 rounded-xl shadow-lg flex flex-col gap-4 z-50"
        >
          {user && (
            <button
              onClick={() => {
                handleMyBlogs();
                setIsMobileMenuOpen(false);
              }}
              className="flex justify-between items-center text-lg font-medium"
            >
              My Blogs <BookText size={20} />
            </button>
          )}

          {user && (
            <button
              onClick={() => {
                handleAddBlog();
                setIsMobileMenuOpen(false);
              }}
              className="flex justify-between items-center text-lg font-medium"
            >
              Add Blog <MessageSquarePlus size={20} />
            </button>
          )}

          <button
            onClick={() => {
              handleAuthClick();
              setIsMobileMenuOpen(false);
            }}
            className="flex justify-between items-center text-lg font-medium"
          >
            {user ? "Logout" : "Login"} {user ? <LogOut size={20} /> : <LogIn size={20} />}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
