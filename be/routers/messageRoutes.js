import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { deleteMessage, getConversations, getMessage, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.get("/:otherUserId", protectRoute, getMessage);
router.delete("/:id", protectRoute, deleteMessage);
router.post("/", protectRoute, sendMessage);

export default router;
