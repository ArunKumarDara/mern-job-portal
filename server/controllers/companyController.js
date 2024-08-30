const companyModel = require("../models/companyModel");

const registerCompany = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }
    const company = await companyModel.findOne({ name });
    if (company) {
      return res.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }
    const newCompany = new companyModel({ name, createdBy: req.id });
    response = await newCompany.save();
    return res.status(201).json({
      message: "Company registered successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyModel.find();
    if (!companies) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Companies fetched successfully",
      success: true,
      data: companies,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getCompaniesByUser = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await companyModel.find({ createdBy: userId });
    if (!companies) {
      return res.status(404).json({
        message: "No companies found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Companies fetched successfully",
      success: true,
      data: companies,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await companyModel.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company fetched successfully",
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedCompany = await companyModel.findByIdAndUpdate(
      companyId,
      req.body,
      { new: true }
    );
    if (!updatedCompany) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      data: updatedCompany,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  registerCompany,
  getCompaniesByUser,
  getCompanyById,
  updateCompany,
  getAllCompanies,
};
