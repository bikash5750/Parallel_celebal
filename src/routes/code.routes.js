import { Router } from "express";
import {
  getLatestCodeVersion,
  getCodeVersions,
  saveCodeVersion,
} from "../controller/code.controller.js";

const coderoute = Router();


coderoute.get("/api/v6/code/:sessionId/latest", getLatestCodeVersion);


coderoute.get("/api/v7/code/:sessionId/versions", getCodeVersions);


coderoute.post("/api/v8/code/:sessionId/save", saveCodeVersion);

export { coderoute };
