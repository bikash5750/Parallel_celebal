import { Router } from "express";
import {
  getLatestCodeVersion,
  getCodeVersions,
  saveCodeVersion
} from "../controller/code.controller.js";

const coderoute = Router();


coderoute.get("/api/v4/code/:sessionId/latest", getLatestCodeVersion);
coderoute.get("/api/v5/code/:sessionId/versions", getCodeVersions);
coderoute.post("/api/v6/code/:sessionId/save", saveCodeVersion);

export { coderoute};
