import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const blogToEdit = blogs.find((b) => b.id === parseInt(id));
    if (blogToEdit) {
      setBlog(blogToEdit);
    } else {
      alert("Blog not found");
      navigate("/");
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];

    const updateAndSave = (updatedBlog) => {
      const updatedBlogs = blogs.map((b) =>
        b.id === parseInt(id) ? updatedBlog : b
      );
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
      alert("Blog updated successfully!");
      navigate("/");
    };

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const base64Image = reader.result;
        const updatedBlog = { ...blog, image: base64Image };
        updateAndSave(updatedBlog);
      };
      reader.onerror = () => alert("Failed to upload image");
    } else {
      updateAndSave(blog);
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
