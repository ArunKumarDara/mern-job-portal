const companyModel = require("../models/companyModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const registerCompany = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
    });
    const { name, description, website, location, employees } = req.body;
    if (!name || !description || !website || !location || !employees) {
      return res.status(400).json({
        message: "Some fields are missing",
        success: false,
      });
    }
    const logo = uploadResult.secure_url;
    const newCompany = new companyModel({
      name,
      description,
      website,
      location,
      employees,
      logo,
      createdBy: req.id,
    });
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
    const companies = await companyModel
      .find({ createdBy: userId })
      .sort({ createdAt: -1 });
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
    const uploadResult = await cloudinary.uploader.upload(req.file.path);
    fs.unlink(req.file.path, (err) => {
      if (err) console.log(err);
    });
    const companyId = req.params.id;
    const logo = uploadResult.secure_url;
    const updatedCompany = await companyModel.findByIdAndUpdate(
      companyId,
      { ...req.body, logo: logo },
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
