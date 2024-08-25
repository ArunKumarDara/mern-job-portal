const express = require("express");
const {
  updateCompany,
  registerCompany,
  getCompanies,
  getCompanyById,
} = require("../controllers/companyController");
const validateJwtToken = require("../middlewares/authentication");
const companyRouter = express.Router();

companyRouter.post("/register", validateJwtToken, registerCompany);
companyRouter.get("/getCompanies", validateJwtToken, getCompanies);
companyRouter.get("/:id", validateJwtToken, getCompanyById);
companyRouter.post("/update/:id", validateJwtToken, updateCompany);

module.exports = companyRouter;
