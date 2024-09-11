const express = require("express");
const {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus,
} = require("../controllers/applicationController");
const validateJwtToken = require("../middlewares/authentication");
const applicationRouter = express.Router();

applicationRouter.post("/apply/:id", validateJwtToken, applyJob);
applicationRouter.get("/getAppliedJobs", validateJwtToken, getAppliedJobs);
applicationRouter.get("/get/:id", validateJwtToken, getApplicants);
applicationRouter.post("/:id/status/update", validateJwtToken, updateStatus);

module.exports = applicationRouter;
