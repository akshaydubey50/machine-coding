import { io } from "socket.io-client";

// Connect to your backend server (change the URL as per your setup)
const socket = io("http://localhost:3000", {
  transports: ["websocket"], // Ensures better real-time performance
  withCredentials: true,     // Allows cross-origin requests if needed
});

export default socket;
