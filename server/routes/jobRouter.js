const express = require("express");
const {
  addJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  getLatestJobs,
} = require("../controllers/jobController");
const validateJwtToken = require("../middlewares/authentication");

const jobRouter = express.Router();

jobRouter.post("/add", validateJwtToken, addJob);
jobRouter.get("/latestJobs", getLatestJobs);
jobRouter.get("/getAllJobs", getAllJobs);
jobRouter.get("/getAdminJobs", validateJwtToken, getAdminJobs);
jobRouter.get("/:id", getJobById);

module.exports = jobRouter;
