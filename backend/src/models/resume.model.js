import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        filename: {
            type: String,
        },

        resumeText: {
            type: String,
        },

        predictedRole: {
            type: String,
        },

        uploadedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;