import { Router } from "express";
import { registeruser , userlogin , logoutuser} from "../conrollers/user.controller.js"
//import { verifyjwt } from "../middleware/auth.js";

const userrouter = Router();


userrouter.post("/api/v1/registeruser" , registeruser)

userrouter.post("/api/v2/userlogin" , userlogin)

userrouter.post("/api/v3/verifyjwt" , verifyjwt , logoutuser)

export {userrouter};