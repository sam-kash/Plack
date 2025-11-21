    import dotenv from "dotenv"
    dotenv.config();

    import http from "http"
    import app from "./app"
    import { connectDb } from "./config/db";
    import { Server } from "socket.io";

    const server = http.createServer(app);

    const io = new Server(server, {
        cors: {
            origin: "*",
        }
    });

    connectDb();

    io.on("connection", (socket) => {
        console.log("A user connected: ", socket.id);

        socket.on("join_channel", (channelId) => {
            socket.join(channelId);
            console.log(`User ${socket.id} joined channel : ${channelId}`);
        });

        socket.on("disconnect", ()=>{
            console.log("User disconnected:", socket.id);
        });
    });

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log("server running on port 5000")
    });