import dotenv from "dotenv";
dotenv.config({ path: "./.env" });


//console.log("DB_URI:", process.env.DB_URI);

export default {
  DB_URI: process.env.DB_URI,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  PORT: process.env.PORT || 3000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXP: process.env.ACCESS_TOKEN_EXP || "1d",
};
