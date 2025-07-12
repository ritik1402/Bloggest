import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { motion } from "motion/react";
import ReadMore from "./ReadMore";
import axios from "axios";
import toast from "react-hot-toast";

const MyBlog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const myBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/blog/myblog/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          setBlogs(response.data.blog);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    myBlogs();
  }, [navigate, user, token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/blog/deleteblog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedBlogs = blogs.filter((post) => post._id !== id);
      setBlogs(updatedBlogs);
      toast.success("Blog deleted successfully!",{
        style : {
          backgroundColor: "green",
          color: "white",
        }
      });
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Failed to delete blog.",{
        style: {
          backgroundColor: "red",
          color: "white",
        }
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-[#00ADB5]">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">My Blogs</h1>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {blogs.length === 0 ? (
          <p className="text-center w-full text-xl text-gray-500">
            No blogs found. Add one!
          </p>
        ) : (
          blogs.map((post) => (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              key={post._id}
              className="w-full sm:w-[80%] md:w-[45%] xl:w-[30%] bg-white border border-[#00ADB5] rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] flex flex-col p-6 cursor-pointer"
              onClick={() => handleReadMore(post._id)}
            >
              <h2 className="text-2xl font-bold text-[#00ADB5] text-center mb-3 border-b-2 pb-2 border-[#EEEEEE]">
                {post.title}
              </h2>

              <div className="flex flex-col items-center gap-4">
                <div className="text-sm text-gray-700 leading-6 px-1 text-justify w-[100%]">
                  <ReadMore text={post.content} maxLength={220} id={post._id}  />
                </div>

                {post.image && (
                  <div className="w-[130px] h-[130px] rounded-full overflow-hidden border-4 border-[#393E46] shadow-md">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <p className="text-sm text-gray-500 font-medium mt-2">
                  ~ {post.author}
                </p>

                <div className="flex gap-4 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.9, transition: { delay: 0.3 } }}
                    className="bg-[#00ADB5] text-white px-4 py-1 rounded-lg hover:bg-[#007b87] transition-all text-sm cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(post._id);
                    }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-all text-sm cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(post._id);
                    }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBlog;
