const express = require("express");
const {
  userSignup,
  userLogin,
  userLogout,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.post("/updateProfile", updateProfile);

module.exports = userRouter;
