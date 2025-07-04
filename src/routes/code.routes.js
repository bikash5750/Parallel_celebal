import { Router } from "express";
import {
  getLatestCodeVersion,
  getCodeVersions,
  saveCodeVersion,
} from "../controller/code.controller.js";

const coderoute = Router();

// Get latest version of code for a session
coderoute.get("/api/v4/code/:sessionId/latest", getLatestCodeVersion);

// Get all versions of code for a session
coderoute.get("/api/v5/code/:sessionId/versions", getCodeVersions);

// Save a new version of code to a session
coderoute.post("/api/v6/code/:sessionId/save", saveCodeVersion);

export { coderoute };
