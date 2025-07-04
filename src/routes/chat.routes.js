import { Router } from "express";
import { getMessages, saveMessage } from "../controller/chat.controller.js";

const chatrouter = Router();


chatrouter.post("/api/v7/savemessage", saveMessage);


chatrouter.get("/api/v8/getmessages/:sessionId", getMessages);

export { chatrouter };
