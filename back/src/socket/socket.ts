import { Server } from "socket.io";
import Message from "../models/Message";

export const socketHandler = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // When a user joins a channel/room
        socket.on("join_channel", (channelId) => {
            socket.join(channelId);
            console.log(`User ${socket.id} joined channel ${channelId}`);
        });

        // When a message is sent
        socket.on("send_message", async ({ channelId, userId, text }) => {
            try {
                const message = await Message.create({
                    channelId,
                    userId,
                    text,
                });

                // Broadcast new message to everyone in the room
                io.to(channelId).emit("new_message", message);
            } catch (err) {
                console.error("Error saving message", err);
            }
        });

    });
};
