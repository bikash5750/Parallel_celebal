import express from "express"
import CookieParser from "cookieparser"
import cors from "cors"
import { userrouter } from "./src/routes/user.routes.js"

const app = express()

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({origin : process.env.cors_origin}))
app.use(express.static("public"))

app.use("/user" , userrouter)

export {app}