import React, { useEffect, useState, useContext } from "react";
import ReadMore from "./Readmore.jsx";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { motion, useScroll } from "motion/react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const handleReadMore = (id) => {
    navigate(`/blog/${id}`);
  };

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    const updatedBlogs = blogs.filter((post) => post.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
          backgroundColor: "red",
        }}
      />

      <div className="bg-[#f5f7fa] py-10 min-h-screen">
        <h1 className="text-center text-4xl font-extrabold text-[#222831] mb-10">
          Featured <span className="text-[#00ADB5]">Blogs</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-8 px-4">
          {blogs.length === 0 ? (
            <p className="text-center w-full text-xl text-gray-500">
              No blogs found. Add one!
            </p>
          ) : (
            blogs.map((post, index) => (
              <motion.div
  initial={{ opacity: 0, y: -100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, delay: 0.2 }}
  key={index}
  className="w-full sm:w-[80%] md:w-[45%] xl:w-[30%] 
             bg-white border border-[#00ADB5] 
             border-t-8 rounded-3xl shadow-xl 
             hover:shadow-2xl transition-all duration-300 
             hover:scale-[1.03] 
             flex flex-col justify-between 
             p-6 
             min-h-[550px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[450px]"
>

                <h2 className="text-2xl font-bold text-[#00ADB5] text-center mb-3 border-b-2 pb-2 border-[#EEEEEE]">
                  {post.title}
                </h2>

                <div className="flex flex-col items-center gap-4">
                  <div className="text-sm text-gray-700 leading-6 px-1 text-justify">
                    <ReadMore text={post.content} maxLength={220} id={post.id} />
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

                  {user?.email === post.authorEmail && (
                    <div className="flex gap-4 mt-4">
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9, transition: { delay: 0.3 } }}
                        className="bg-[#00ADB5] cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-[#007b87] transition-all text-sm"
                        onClick={() => handleEdit(post.id)}
                      >
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.9, transition: { duration: 0.3 } }}
                        className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-lg hover:bg-red-600 transition-all text-sm"
                        onClick={() => handleDelete(post.id)}
                      >
                        Delete
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;
