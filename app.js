import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import { userrouter } from "./src/routes/user.routes.js";
import { coderoute } from "./src/routes/code.routes.js";
import { chatrouter } from "./src/routes/chat.routes.js";

// Socket logic
import socketHandler from "./socketHandler.js";

// Load environment variables
dotenv.config();

const app = express();

// Create HTTP server and Socket server in index.js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  credentials: true
}));
app.use(express.static("public"));

// Routes
app.use("/user", userrouter);
app.use("/code", coderoute);
app.use("/chat", chatrouter);

// Export app and socket handler
export { app, socketHandler };
