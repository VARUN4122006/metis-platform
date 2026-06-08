import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "",
    },

    salary: {
      type: String,
      default: "",
    },

    experience: {
      type: String,
      default: "",
    },

    jobType: {
      type: String,
      enum: [
        "Full-Time",
        "Part-Time",
        "Internship",
        "Remote",
      ],
      default: "Full-Time",
    },

    skills: [String],

    bannerImage: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Job",
  jobSchema
);