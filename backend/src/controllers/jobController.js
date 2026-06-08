import Job from "../models/job.js";

export const createJob = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const {
      title,
      company,
      description,
      location,
      salary,
      experience,
      jobType,
      skills,
    } = req.body;

    if (!title || !company || !description) {
  return res.status(400).json({
    success: false,
    message: "Title, Company and Description are required",
  });
}
    const job = await Job.create({
      title,
      company,
      description,
      location,
      salary,
      experience,
      jobType,
      skills: skills
        ? skills.split(",")
        : [],
      bannerImage: req.file
        ? req.file.originalname
        : "",
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSingleJob = async (
  req,
  res
) => {
  try {
    const job = await Job.findById(
      req.params.id
    ).populate("company");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};