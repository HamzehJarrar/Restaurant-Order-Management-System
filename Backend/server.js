import "./src/config/env.js";
import express from "express";


import connectDB from "./database/connection.js";
import init from "./src/routes/index.js";
import cors from "cors";

import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

init(express, app);

connectDB();

io.on("connection", (socket) => {
  console.log("🔥 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

const port = Number(process.env.PORT) || 4000;

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
