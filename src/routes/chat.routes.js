import { Router } from "express";
import { getMessages, saveMessage } from "../controller/chat.controller.js";

const chatrouter = Router();


chatrouter.post("/api/v4/savemessage", saveMessage);


chatrouter.get("/api/v5/getmessages/:sessionId", getMessages);

export { chatrouter };
