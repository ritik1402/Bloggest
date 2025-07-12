import Blog from "../models/Blog.js";


export const addBlog = async (req, res) => {
  try {
    console.log("find user ========================================", req.user); 
    const blog = new Blog({
      ...req.body,
      user: req.user.id,
      author: req.user.email, 
    });

    await blog.save();

    res.status(201).json({
      success: true,
      message: "Blog added successfully in db",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const editBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const delBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const myBlog = async (req, res) => {
  try {
    const blog = await Blog.find({ user: req.user.id }).sort({ createdAt: -1 });

    if (blog.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No blogs found for this user." });
    }

    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


export const detailblog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
