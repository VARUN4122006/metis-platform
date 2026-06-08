import Application from "../models/application.js";
import Job from "../models/job.js";
import Resume from "../models/Resume.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const candidateId = req.user.id;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const latestResume = await Resume.findOne({
      user: candidateId,
    }).sort({ createdAt: -1 });

    if (!latestResume) {
      return res.status(400).json({
        success: false,
        message:
          "Please upload resume first",
      });
    }

    const application =
      await Application.create({
        candidate: candidateId,
        job: jobId,
        resume: latestResume._id,

        matchScore:
          latestResume.matchScore || 0,
      });

    res.status(201).json({
      success: true,
      application,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id,
    })
      .populate("job")
      .populate("resume")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("candidate")
      .populate("job")
      .populate("resume")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};