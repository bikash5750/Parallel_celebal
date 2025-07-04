import  ChatMessage  from "../model/chatmessage.model.js";
import { CodeSession } from "../model/codesession.model.js";
import { User } from "../model/user.model.js";

// Save chat message
const saveMessage = async (req, res) => {
  try {
    const { sessionId, sender, message } = req.body;

    if (!sessionId || !sender || !message) {
      return res.status(400).json({
        msg: "All fields (sessionId, sender, message) are required.",
      });
    }

    const sessionExists = await CodeSession.findOne({ sessionId });
    if (!sessionExists) {
      return res.status(404).json({ msg: "Invalid session ID." });
    }

    const userExists = await User.findById(sender);
    if (!userExists) {
      return res.status(404).json({ msg: "Sender user not found." });
    }

    const newMessage = new ChatMessage({ sessionId, sender, message });
    await newMessage.save();

    return res.status(201).json({ message: "Message saved successfully." });
  } catch (err) {
    console.error("Error in saveMessage:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

// Get messages by session
const getMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ msg: "Session ID is required." });
    }

    const sessionExists = await CodeSession.findOne({ sessionId });
    if (!sessionExists) {
      return res.status(404).json({ msg: "No session found for the given ID." });
    }

    const messages = await ChatMessage.find({ sessionId })
      .populate("sender", "username")
      .sort({ timestamp: 1 });

    return res.status(200).json({
      success: true,
      message: "Messages retrieved successfully.",
      data: messages,
    });
  } catch (err) {
    console.error("Error in getMessages:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

export { getMessages, saveMessage };
