import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userrouter } from "./src/routes/user.routes.js";
import { coderoute } from "./src/routes/code.routes.js";
import { chatrouter } from "./src/routes/chat.routes.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.static("public"));

// Routes
app.use("/user", userrouter);
app.use("/code", coderoute);
app.use("/chat", chatrouter);



export { app };
