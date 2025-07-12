import express from "express";
import { signup, login, verifyToken } from "../Controllers/authController.js";
import User from "../Models/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in /profile:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
