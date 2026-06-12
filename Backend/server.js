import "./src/config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./database/connection.js";
import init from "./src/routes/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd    = process.env.NODE_ENV === "production";

const app    = express();
const server = createServer(app);

const allowedOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const io = new Server(server, {
  cors: { origin: allowedOrigin, credentials: true },
});

app.set("io", io);
app.use((req, _res, next) => { req.io = io; next(); });

app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(cookieParser());

// API routes
init(express, app);

// Serve frontend build in production
if (isProd) {
  const distPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

connectDB();

io.on("connection", (socket) => {
  socket.on("disconnect", () => {});
});

const port = Number(process.env.PORT) || 4000;
server.listen(port, () => {
  console.log(`Server running on port ${port} [${process.env.NODE_ENV || "development"}]`);
});
