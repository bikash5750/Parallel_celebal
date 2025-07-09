const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a specific code session (room)
    socket.on("join-session", (sessionId) => {
      socket.join(sessionId);
      console.log(`👤 ${socket.id} joined session: ${sessionId}`);

      // Notify others (optional)
      socket.to(sessionId).emit("user-joined", { userId: socket.id });
    });

    // Handle code changes
    socket.on("code-change", ({ sessionId, code }) => {
      // Broadcast code to everyone else in the room
      socket.to(sessionId).emit("receive-code", code);
    });

    // Handle chat messages
    socket.on("send-message", ({ sessionId, message, sender }) => {
      // Broadcast to others in session
      socket.to(sessionId).emit("receive-message", {
        message,
        sender,
        timestamp: new Date().toISOString(),
      });
    });

    // Optional: typing indicators
    socket.on("typing", ({ sessionId, userId }) => {
      socket.to(sessionId).emit("user-typing", { userId });
    });

    socket.on("stop-typing", ({ sessionId, userId }) => {
      socket.to(sessionId).emit("user-stop-typing", { userId });
    });

    // Leave room (optional if client handles it)
    socket.on("leave-session", (sessionId) => {
      socket.leave(sessionId);
      console.log(`👤 ${socket.id} left session: ${sessionId}`);
      socket.to(sessionId).emit("user-left", { userId: socket.id });
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);
      // You could emit a global or room-based "user-disconnected" here if needed
    });
  });
};

export default socketHandler;
