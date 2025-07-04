import express from "express";
import { app } from "./app.js";
import config from "./utils/config.js";
import { connectdb } from "./src/connectdb/connectdb.js";

const PORT = config.PORT || 3000;

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to the database:", err.message);
    process.exit(1); 
  });
