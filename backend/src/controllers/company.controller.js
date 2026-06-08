import Company from "../models/company.js";

export const createCompany = async (req, res) => {
  try {
    const {
      name,
      website,
      description,
      location,
      industry,
    } = req.body;

    const company = await Company.create({
      name,
      website,
      description,
      location,
      industry,
      logo: req.file
        ? req.file.originalname
        : "",
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getCompanies = async (
  req,
  res
) => {
  try {
    const companies = await Company.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: companies.length,
      companies,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};