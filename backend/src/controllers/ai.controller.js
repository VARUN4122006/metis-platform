import pdfParse from "pdf-parse";
import Resume from "../models/Resume.js";

// =======================
// Upload Resume
// =======================
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    console.log("Uploaded File:");
    console.log(req.file);

    // Read PDF Buffer
    const dataBuffer = req.file.buffer;

    // Extract Text
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    console.log("Resume Text:");
    console.log(resumeText);

    const text = resumeText.toLowerCase();

    let predictedRole = "Unknown";

    let javaScore = 0;
    let aiScore = 0;
    let fullStackScore = 0;
    let dataAnalystScore = 0;

    // Java Developer
    if (text.includes("java")) javaScore += 2;
    if (text.includes("spring")) javaScore += 2;
    if (text.includes("hibernate")) javaScore += 1;

    // AI/ML Engineer
    if (text.includes("python")) aiScore += 2;
    if (text.includes("machine learning")) aiScore += 3;
    if (text.includes("tensorflow")) aiScore += 2;
    if (text.includes("pandas")) aiScore += 1;
    if (text.includes("numpy")) aiScore += 1;
    if (text.includes("artificial intelligence")) aiScore += 2;
    if (text.includes("ai")) aiScore += 1;

    // Full Stack Developer
    if (text.includes("react")) fullStackScore += 2;
    if (text.includes("node")) fullStackScore += 2;
    if (text.includes("express")) fullStackScore += 1;
    if (text.includes("mongodb")) fullStackScore += 1;
    if (text.includes("mern")) fullStackScore += 3;
    if (text.includes("javascript")) fullStackScore += 1;
    if (text.includes("html")) fullStackScore += 1;
    if (text.includes("css")) fullStackScore += 1;

    // Data Analyst
    if (text.includes("data analyst")) dataAnalystScore += 3;
    if (text.includes("sql")) dataAnalystScore += 2;
    if (text.includes("power bi")) dataAnalystScore += 2;
    if (text.includes("excel")) dataAnalystScore += 1;
    if (text.includes("tableau")) dataAnalystScore += 2;

    console.log({
      javaScore,
      aiScore,
      fullStackScore,
      dataAnalystScore,
    });

    const maxScore = Math.max(
      javaScore,
      aiScore,
      fullStackScore,
      dataAnalystScore
    );

    if (maxScore === 0) {
      predictedRole = "Unknown";
    } else if (maxScore === javaScore) {
      predictedRole = "Java Developer";
    } else if (maxScore === aiScore) {
      predictedRole = "AI/ML Engineer";
    } else if (maxScore === fullStackScore) {
      predictedRole = "Full Stack Developer";
    } else {
      predictedRole = "Data Analyst";
    }

    console.log("Predicted Role:", predictedRole);

  const newResume = new Resume({
  user: req.user.id,

  filename: req.file.originalname,
  predictedRole,
  resumeText,
});
    await newResume.save();

    res.status(200).json({
      success: true,
      predictedRole,
      scores: {
        javaScore,
        aiScore,
        fullStackScore,
        dataAnalystScore,
      },
      data: newResume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// =======================
// Match Job Description
// =======================
export const matchJobDescription = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "resumeId and jobDescription are required",
      });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const resumeText = resume.resumeText
      .toLowerCase()
      .replace(/\s+/g, " ");

    const jdText = jobDescription
      .toLowerCase()
      .replace(/\s+/g, " ");

    const skills = [
      "java",
      "spring",
      "python",
      "machine learning",
      "tensorflow",
      "pandas",
      "numpy",
      "react",
      "node",
      "express",
      "mongodb",
      "mern",
      "sql",
      "power bi",
      "tableau",
      "excel",
    ];

    const matchedSkills = [];
    const missingSkills = [];

    skills.forEach((skill) => {
      if (jdText.includes(skill)) {
        if (resumeText.includes(skill)) {
          matchedSkills.push(skill);
        } else {
          missingSkills.push(skill);
        }
      }
    });

    const totalSkills =
      matchedSkills.length + missingSkills.length;

    const matchScore =
      totalSkills > 0
        ? Math.round(
            (matchedSkills.length / totalSkills) * 100
          )
        : 0;
        const suggestions = [];

missingSkills.forEach((skill) => {
  suggestions.push(`Add ${skill} skill or project to your resume`);
});

    res.status(200).json({
  success: true,
  matchScore,
  matchedSkills,
  missingSkills,
  suggestions,
  predictedRole: resume.predictedRole,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};