import express from "express";
import {
  addBlog,
  editBlog,
  getBlog,
  delBlog,
  myBlog,
  detailblog,
} from "../Controllers/blogController.js";
import { verifyToken } from "../Controllers/authController.js";

const router = express.Router();


router.post("/addblog", verifyToken, addBlog);
router.get("/getblog", getBlog);
router.put("/editblog/:id", verifyToken, editBlog);
router.delete("/deleteblog/:id", verifyToken, delBlog);
router.get("/myblog", verifyToken, myBlog);
router.get("/detailblog/:id", verifyToken, detailblog); 

export default router;
