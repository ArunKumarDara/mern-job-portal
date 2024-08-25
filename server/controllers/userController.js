const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "some fields are missing" });
    }
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(password, salt);
    const user = new userModel({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    const response = await user.save();
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "some fields are missing" });
    }
    const userExist = await userModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const validatePassword = await bcrypt.compareSync(
      password,
      userExist.password
    );
    if (!validatePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }
    if (role !== userExist.role) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }
    const tokenData = {
      userId: userExist._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${userExist.fullName}`,
        success: true,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error" || error.message });
  }
};

const userLogout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    if (!fullName || !email || !phoneNumber || !bio || skills) {
      return res
        .status(400)
        .json({ success: false, message: "some fields are missing" });
    }
    const skillsArray = skills.split(",");
    const userId = req.id;
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    (user.fullName = fullName),
      (user.email = email),
      (user.phoneNumber = phoneNumber),
      (user.profile.bio = bio),
      (user.profile.skills = skillsArray);

    await user.save();
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  userSignup,
  userLogin,
  userLogout,
  updateProfile,
};
