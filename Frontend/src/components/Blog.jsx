import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/blog/detailblog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setBlog(response.data.blog);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };

    fetchBlog();
  }, [id, navigate, token]);

  if (!blog) {
    return <div className="text-center mt-10 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <div className="bg-[#EEEEEE] shadow-xl rounded-2xl p-6 border-t-8 border-[#00ADB5] transition-all duration-300">
        <h1 className="text-3xl md:text-4xl font-bold text-[#222831] mb-4 text-center">
          {blog.title}
        </h1>

        <div className="flex flex-col md:flex-row items-center justify-between mb-4 ">
          <p className="text-gray-600 text-md">
            <strong>Author:</strong> {blog.author}
          </p>
          <p className="text-gray-600 text-md">
            <strong>Date:</strong> {blog.date || "N/A"}
          </p>
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-[400px] object-contain rounded-xl border border-[#393E46] mb-6"
          />
        )}
        <div className="w-full text-wrap break-words text-justify p-2 ">
          {blog.content}
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="bg-[#00ADB5] cursor-pointer text-[#222831] px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all"
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
