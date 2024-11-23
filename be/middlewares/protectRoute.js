import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.googleId) {
      console.log("User logged in via Google");
    }

    req.user = user;

    next();
  } catch (err) {
    console.log("Error in protectRoute:", err.message); // Log lỗi
    res.status(500).json({ message: "Server error", error: err.message }); // Trả về lỗi server nếu có sự cố
  }
};

export default protectRoute;
