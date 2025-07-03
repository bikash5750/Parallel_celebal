import mongoose from "mongoose";

const VersionSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const CodeSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  language: {
    type: String,
    default: "javascript"
  },
  versions: [VersionSchema]
}, { timestamps: true });

const CodeSession = mongoose.model("CodeSession" ,CodeSessionSchema )

export {CodeSession}
