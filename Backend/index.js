import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

// Connect to MongoDB
try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

// API routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Serve Vite frontend from the 'dist' folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});