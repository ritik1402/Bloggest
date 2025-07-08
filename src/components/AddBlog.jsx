import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Typewriter from "typewriter-effect";
import { motion } from "motion/react";


const AddBlog = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: user?.email || "",
    image: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);

    reader.onloadend = () => {
      const base64Image = reader.result;

      const newBlog = {
        ...blog,
        image: base64Image,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        authorEmail: user?.email || "",
      };

      const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
      const updatedBlogs = [newBlog, ...existingBlogs];
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

      alert("Blog added successfully!");
      navigate("/");
    };

    reader.onerror = () => {
      alert("Error uploading image.");
    };
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 ">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <Typewriter
          options={{
            strings: ["Create a new blog"],
            autoStart: true,
            loop: true,
            duratio: 2000,
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

        <label className="text-xl font-semibold">Author:</label>
        <input
          type="text"
          name="author"
          placeholder="Author name"
          className="p-2 border border-[#00ADB5] rounded-lg"
          value={blog.author}
          onChange={handleChange}
        />

        <label className="text-xl font-semibold">Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {selectedFile && <p className="text-sm">{selectedFile.name}</p>}

        <motion.button
        whileHover={{ scale: 1.1 ,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.9 ,
          transition: { duration: 0.3 },
        }}
        
          className="bg-[#00ADB5] text-white font-semibold py-2 px-6 rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </motion.button>
      </div>
    </div>
  );
};

export default AddBlog;
