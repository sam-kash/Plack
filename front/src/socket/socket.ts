import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5000", {
  autoConnect: false,
});

export const connectSocket = () => {
  if (!socket.connected) socket.connect();
  return socket;
};

export const getSocket = () => socket;

export { socket };
