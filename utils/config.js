import dotenv from "dotenv"
dotenv.config({path : "./.env"})


export default {
  DB_URI: process.env.DB_URI,
  CLOUD_NAME:process.env.CLOUD_NAME,
  API_KEY:process.env.API_KEY,
  API_SECRET:process.env.API_SECRET
};