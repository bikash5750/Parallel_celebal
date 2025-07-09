import http from "http";
import { Server } from "socket.io";
import { app, socketHandler } from "./app.js";
import config from "./utils/config.js";
import { connectdb } from "./src/connectdb/connectdb.js";

const PORT = config.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

socketHandler(io);

connectdb()
  .then(() => {
    server.listen(PORT, () => {
      console.log(` Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Failed to connect to the database:", err.message);
    process.exit(1); 
  });
