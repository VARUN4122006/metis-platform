import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Shortlisted",
        "Rejected",
      ],
      default: "Applied",
    },

    matchScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Application",
  applicationSchema
);