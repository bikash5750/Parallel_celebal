import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ChatMessage", ChatMessageSchema);
