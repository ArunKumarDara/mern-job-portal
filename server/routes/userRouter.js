const express = require("express");
const {
  userSignup,
  userLogin,
  userLogout,
  updateProfile,
} = require("../controllers/userController");
const validateJwtToken = require("../middlewares/authentication");

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.get("/logout", userLogout);
userRouter.post("/updateProfile", validateJwtToken, updateProfile);

module.exports = userRouter;
