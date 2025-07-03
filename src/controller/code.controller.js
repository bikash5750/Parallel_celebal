import CodeSession from "../model/codesession.model.js";
import User from "../model/user.model.js";

// Save new code version
const saveCodeVersion = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { code, updatedBy, language } = req.body;

    // Validate input
    if (!sessionId || !code || !updatedBy) {
      return res.status(400).json({ msg: "Required fields missing (sessionId, code, updatedBy)" });
    }

    // Validate user
    const user = await User.findById(updatedBy);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Find or create session and save version
    const session = await CodeSession.findOneAndUpdate(
      { sessionId },
      {
        $push: { versions: { code, updatedBy } },
        $setOnInsert: { language: language || "javascript", sessionId }
      },
      { upsert: true, new: true }
    );

    res.status(201).json({
      success: true,
      message: "Code version saved successfully",
      sessionId: session.sessionId
    });
  } catch (err) {
    console.error("Error in saveCodeVersion:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get all code versions
const getCodeVersions = async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({ msg: "Session ID is required" });
    }

    const session = await CodeSession.findOne({ sessionId }).populate("versions.updatedBy", "username");

    if (!session) {
      return res.status(404).json({ msg: "Session not found" });
    }

    res.status(200).json({
      success: true,
      message: "Versions retrieved successfully",
      versions: session.versions
    });
  } catch (err) {
    console.error("Error in getCodeVersions:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get latestone
const getLatestCodeVersion = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await CodeSession.findOne({ sessionId }).populate("versions.updatedBy", "username");

    if (!session || session.versions.length === 0) {
      return res.status(404).json({ msg: "No code found for this session" });
    }

    const latest = session.versions[session.versions.length - 1];

    res.status(200).json({
      success: true,
      message: "Latest code retrieved successfully",
      latestVersion: latest
    });
  } catch (err) {
    console.error("Error in getLatestCodeVersion:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { saveCodeVersion, getCodeVersions, getLatestCodeVersion };
