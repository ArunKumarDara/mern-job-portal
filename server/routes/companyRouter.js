const express = require("express");
const {
  updateCompany,
  registerCompany,
  getCompanyById,
  getAllCompanies,
  getCompaniesByUser,
} = require("../controllers/companyController");
const validateJwtToken = require("../middlewares/authentication");
const companyRouter = express.Router();

companyRouter.post("/register", validateJwtToken, registerCompany);
companyRouter.get("/getAllCompanies", validateJwtToken, getAllCompanies);
companyRouter.get("/getCompaniesByUser", validateJwtToken, getCompaniesByUser);
companyRouter.get("/:id", validateJwtToken, getCompanyById);
companyRouter.post("/update/:id", validateJwtToken, updateCompany);

module.exports = companyRouter;
