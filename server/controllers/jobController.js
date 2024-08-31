const jobModel = require("../models/jobModel");

const addJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      positions,
      experienceLevel,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !positions ||
      !experienceLevel ||
      !companyId
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Some fields are missing" });
    }
    const newJob = new jobModel({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      positions,
      experienceLevel,
      company: companyId,
      createdBy: userId,
    });
    const response = await newJob.save();
    return res.status(200).json({
      success: true,
      message: "Job added successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const page = req.query.page;
    const keyword = req.query.keyword || "";
    const limit = req.query.limit;
    const skip = parseInt(page) * parseInt(limit);
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await jobModel
      .find(query)
      .populate("company")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      success: true,
      message: "jobs fetched successfully",
      data: jobs,
      nextPage: parseInt(page) + 1,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getLatestJobs = async (req, res) => {
  try {
    const limit = req.query.limit;
    const jobs = await jobModel
      .find()
      .populate("company")
      .sort({ createdAt: -1 })
      .limit(limit);
    return res.status(200).json({
      success: true,
      message: "jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId).populate("company");
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAdminJobs = async (req, res) => {
  try {
    const userId = req.id;
    const jobs = await jobModel
      .find({ createdBy: userId })
      .populate("company")
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ success: false, message: "No jobs found" });
    }
    return res.status(200).json({
      success: true,
      message: "Admin jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  addJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  getLatestJobs,
};
