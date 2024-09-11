const express = require("express");
const {
  userSignup,
  userLogin,
  userLogout,
  updateProfile,
  uploadProfilePic,
  getCurrentUser,
} = require("../controllers/userController");
const validateJwtToken = require("../middlewares/authentication");
const multerUserProfileUploader = require("../userProfile/uploadProfile");
const multerUserResumeUploader = require("../userProfile/uploadResume");

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/logout", userLogout);
userRouter.post(
  "/updateProfile",
  multerUserResumeUploader,
  validateJwtToken,
  updateProfile
);
userRouter.put(
  "/uploadProfilePic",
  multerUserProfileUploader,
  validateJwtToken,
  uploadProfilePic
);
userRouter.post("/getUser", validateJwtToken, getCurrentUser);

module.exports = userRouter;
