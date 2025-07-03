import ChatMessage from "../model/chatmessage.model.js";
import CodeSession from "../model/codesession.model.js";
import User from "../model/user.model.js"; 

const saveMessage = async (req, res) => {
  try {
    const { sessionId, sender, message } = req.body;

    if (!sessionId || !sender || !message) {
      return res.status(400).json({
        msg: "All fields (sessionId, sender, message) are required"
      });
    }

    // Check if session exists
    const sessionExists = await CodeSession.findOne({ sessionId });
    if (!sessionExists) {
      return res.status(404).json({ msg: "Session ID does not exist" });
    }

    // Check if sender (user) exists
    const userExists = await User.findById(sender);
    if (!userExists) {
      return res.status(404).json({ msg: "Sender (user) does not exist" });
    }

    // Save message
    const newMessage = new ChatMessage({ sessionId, sender, message });
    await newMessage.save();

    res.status(201).json({ message: "Message saved successfully" });
  } catch (err) {
    console.error("Error in saveMessage:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Validate input
    if (!sessionId) {
      return res.status(400).json({ msg: "Session ID is required" });
    }

    // Check if session exists
    const sessionExists = await CodeSession.findOne({ sessionId });
    if (!sessionExists) {
      return res.status(404).json({ msg: "No session found for given ID" });
    }

    // Fetch messages
    const messages = await ChatMessage.find({ sessionId })
      .populate("sender", "username")
      .sort({ timestamp: 1 });

    res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages
    });
  } catch (err) {
    console.error("Error in getMessages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { getMessages, saveMessage };
