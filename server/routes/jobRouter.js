const express = require("express");
const {
  addJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} = require("../controllers/jobController");
const validateJwtToken = require("../middlewares/authentication");

const jobRouter = express.Router();

jobRouter.post("/add", validateJwtToken, addJob);
jobRouter.get("/getAllJobs", getAllJobs);
jobRouter.get("/getAdminJobs", validateJwtToken, getAdminJobs);
jobRouter.get("/:id", validateJwtToken, getJobById);

module.exports = jobRouter;
