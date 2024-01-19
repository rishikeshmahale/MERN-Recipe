import express from "express";
import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await userModel.findOne({ username: username });

    if (existingUser) {
      return res.status(200).json({
        message: `${existingUser.username} already exist`,
        success: false,
      });
    }

    if (!username || !password) {
      return res.status(200).json({
        message: "All fields are mandatory",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: newUser,
    });
  } catch (err) {
    console.log(`Error in Register Controller ${err.message}`);
    res.status(500).json({
      error: err.message,
      success: false,
      message: `Error : ${err.message}`,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username: username });

    if (!user) {
      res.status(404).json({
        success: false,
        message: `${user.username} doesn't exist, kindly register`,
      });
    }

    if (!username || !password) {
      return res.status(200).json({
        message: "All fields are mandatory",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      data: {
        username: user.username,
      },
      token: token,
      userID: user._id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
      success: false,
      message: `Error : ${err.message}`,
    });
  }
});

export default router;



// middleware
export const verifyToken = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) return res.sendStatus(403);
        next();
      })
    } else {
      res.sendStatus(401);
    }
    
  } catch (err) {
    console.log(err.message);
  }
}

