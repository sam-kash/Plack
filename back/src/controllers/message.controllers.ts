import { Request, Response } from "express";
import Message from "../models/Message";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;

    const messages = await Message.find({ channelId }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { channelId } = req.params;
    const { text } = req.body;
    const userId = (req as any).user?._id; // Comes from protect middleware

    if (!text) {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const newMessage = await Message.create({
      channelId,
      userId,
      text,
    });

    res.status(201).json(newMessage);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
