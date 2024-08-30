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
const multerUploader = require("../userProfile/uploadProfile");

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/logout", userLogout);
userRouter.post("/updateProfile", validateJwtToken, updateProfile);
userRouter.put(
  "/uploadProfilePic",
  multerUploader,
  validateJwtToken,
  uploadProfilePic
);
userRouter.post("/getUser", validateJwtToken, getCurrentUser);

module.exports = userRouter;
