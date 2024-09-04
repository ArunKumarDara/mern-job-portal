const applicationModel = require("../models/applicationModel");
const jobModel = require("../models/jobModel");

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing job ID" });
    }
    const existingApplication = await applicationModel.findOne({
      applicant: userId,
      job: jobId,
    });
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    const newApplication = new applicationModel({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication.applicant);
    const response = await newApplication.save();
    job.applications.push(response.applicant);
    await job.save();
    res.status(201).json({
      success: true,
      data: response,
      message: "Application saved successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await applicationModel
      .find({ applicant: userId })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: {
            sort: { createdAt: -1 },
          },
        },
      })
      .sort({ createdAt: -1 });
    if (!applications) {
      return res
        .status(404)
        .json({ success: false, message: "No applications found" });
    }
    res.status(200).json({
      success: true,
      data: applications,
      message: "Applications fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing job ID" });
    }
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    const applicants = await applicationModel
      .find({ job: jobId })
      .populate({
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      })
      .sort({ createdAt: -1 });
    if (!applicants) {
      return res
        .status(404)
        .json({ success: false, message: "No applicants found" });
    }
    res.status(200).json({
      success: true,
      data: applicants,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status || !["pending", "accepted", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }
    const application = await applicationModel.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    if (!application) {
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });
    }
    res.status(200).json({
      success: true,
      data: application,
      message: "Status updated successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
};
