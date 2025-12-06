import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import init from "./src/routes/index.js";

import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const server = createServer(app);

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


// socket.io middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
init(express, app);

// Database connection
connectDB();

// Socket.io connection
io.on("connection", (socket) => {
  console.log("🔥 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Server
server.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
