import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddBlog = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const getToken = () => {
    const token = localStorage.getItem("token");

    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = getToken();

    const { title, content } = blog;

    if (!title || !content) {
      toast.error("Please fill in all fields.", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      return;
    }

    if (!token) {
      toast.error("User not authenticated.", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/blog/addblog",
        {
          title,
          content,
          author: user.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Blog added succesfully", {
          style: {
            backgroundColor: "green",
            color: "white",
          },
        });
        navigate("/");
      } else {
        toast.error("Blog could not be added.", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the blog.", {
        style: {
          backgroundColor: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 ">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <Typewriter
          options={{
            strings: ["Create a new blog"],
            autoStart: true,
            loop: true,
            deleteSpeed: 50,
          }}
        />
      </h1>

      <div className="flex flex-col gap-4 border border-t-8 border-[#00ADB5] p-6 rounded-xl bg-[#EEEEEE] shadow-md">
        <label className="text-xl font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          placeholder="Enter the blog title"
          className="p-2 border border-[#00ADB5] rounded-lg"
          value={blog.title}
          onChange={handleChange}
        />

        <label className="text-xl font-semibold">Content:</label>
        <textarea
          name="content"
          placeholder="Write your blog content here..."
          className="p-2 border border-[#00ADB5] rounded-lg h-32"
          value={blog.content}
          onChange={handleChange}
        />

        {/* <label className="text-xl font-semibold">Author:</label>
        <input
          type="text"
          name="author"
          value={user?.email || ""}
          className="p-2 border border-[#00ADB5] rounded-lg bg-gray-100"
          disabled
        /> */}

        <label className="text-xl font-semibold">Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && <p className="text-sm">{selectedFile.name}</p>}

        <motion.button
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
          className="bg-[#00ADB5] text-white font-semibold py-2 px-6 rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </motion.button>
      </div>
    </div>
  );
};

export default AddBlog;
