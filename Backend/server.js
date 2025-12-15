import "./src/config/env.js";
import express from "express";


import connectDB from "./database/connection.js";
import init from "./src/routes/index.js";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";


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

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

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
