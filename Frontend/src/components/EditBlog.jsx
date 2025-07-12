import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"
const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/api/blog/detailblog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setBlog(res.data.blog);
        } else {
          toast.error(err.response?.data?.message || "Blog Not Found.", {
        style: { background: "red", color: "white" },
      });
          navigate("/");
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err.message);
        toast.error(err.response?.data?.message || "Error Fetching Blog", {
        style: { background: "red", color: "white" },
      });
        navigate("/");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      let updatedBlog = { ...blog };

      
      if (selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
          updatedBlog.image = reader.result;

          const res = await axios.put(
            `http://localhost:8080/api/blog/editblog/${id}`,
            updatedBlog,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.success) {
            alert("Blog updated successfully!");
            navigate("/");
          }
        };
        reader.onerror = () => {
          alert("Failed to read image file.");
        };
      } else {
        
        const res = await axios.put(
          `http://localhost:8000/api/blog/editblog/${id}`,
          updatedBlog,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          toast.success("Blog Update Succesfully", {
          style: { background: "green", color: "white" },
        });
        setTimeout(() => navigate("/"), 3500);
          
        }
      }
    } catch (err) {
      console.error("Update error:", err.message);
      toast.error(err.response?.data?.message || "failed to update blog", {
        style: { background: "red", color: "white" },
      });
    }
  };

  if (!blog) return null;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border-t-8 border-[#00ADB5] rounded-xl bg-[#EEEEEE] shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#222831]">Edit Blog</h1>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          className="p-2 border border-[#00ADB5] rounded-lg"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
        />

        <textarea
          name="content"
          className="p-2 border border-[#00ADB5] rounded-lg h-32"
          placeholder="Content"
          value={blog.content}
          onChange={handleChange}
        />

        <input
          type="text"
          name="author"
          className="p-2 border border-[#00ADB5] rounded-lg"
          placeholder="Author"
          value={blog.author}
          onChange={handleChange}
        />

        <input type="file" accept="image/*" onChange={handleFileChange} />
        {blog.image && (
          <img
            src={blog.image}
            alt="Current"
            className="w-32 h-32 object-cover rounded-full border-2 border-[#393E46]"
          />
        )}

        <button
          onClick={handleSubmit}
          className="bg-[#00ADB5] cursor-pointer text-white font-semibold py-2 px-6 rounded-lg hover:scale-105 transition-transform"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditBlog;
