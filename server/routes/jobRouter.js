const express = require("express");
const {
  addJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  getLatestJobs,
  updateJob,
} = require("../controllers/jobController");
const validateJwtToken = require("../middlewares/authentication");

const jobRouter = express.Router();

jobRouter.post("/add", validateJwtToken, addJob);
jobRouter.get("/latestJobs", getLatestJobs);
jobRouter.get("/getAllJobs", getAllJobs);
jobRouter.get("/getAdminJobs", validateJwtToken, getAdminJobs);
jobRouter.get("/:id", getJobById);
jobRouter.post("/update/:id", validateJwtToken, updateJob);

module.exports = jobRouter;
