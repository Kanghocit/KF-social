import express from "express"
import { createPost, deletePost, deleteReplyPost, getFeedPosts, getPost, getUserPosts, likeUnlikePost, replyToPost, updateUserPost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.put("/update/:id", protectRoute, updateUserPost);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likeUnlikePost);
router.put("/reply/:id", protectRoute, replyToPost);
router.delete("/reply/:id", protectRoute, deleteReplyPost);

export default router;
