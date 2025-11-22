import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controllers";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

// Get all messages from a channel
router.get("/:channelId", protect, getMessages);

// Send a message to a specific channel
router.post("/:channelId", protect, sendMessage);

export default router;
