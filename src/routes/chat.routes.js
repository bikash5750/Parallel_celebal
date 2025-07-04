import { Router } from "express";
import {getMessages, saveMessage } from "../controller/chat.controller"

const chatrouter = Router();

chatrouter.post("/api/v7/savemessaga", saveMessage);
chatrouter.get("/api/v8/getmessage" , getMessages);

export {chatrouter}