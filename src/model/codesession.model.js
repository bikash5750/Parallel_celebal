// models/CodeSession.js
import mongoose from "mongoose";


const CodeSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  language: {
    type: String,
    default: "javascript"
  },
  versions: [
    {
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
    }
  ]
}, { timestamps: true });

const CodeSession = mongoose.model("CodeSession", CodeSessionSchema);
export { CodeSession };
