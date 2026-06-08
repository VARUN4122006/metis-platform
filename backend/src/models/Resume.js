import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filename: String,

    resumeText: String,

    predictedRole: String,

    matchScore: {
      type: Number,
      default: 0,
    },

    matchedSkills: [String],

    missingSkills: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Resume", resumeSchema);