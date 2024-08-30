import express from "express"
import { createPost, deletePost, getPost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/:id",getPost);
router.post("/create",protectRoute, createPost);
router.delete("/:id",deletePost);

export default router;
