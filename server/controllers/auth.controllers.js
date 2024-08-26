import bcrypt from "bcryptjs";

import { User } from "../models/user.models.js";
import { generateVerificationToken } from "../utils/generateVerificationToken.utils.js";
import { generateJwtTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie.utils.js";
import { sendVerficationEmail } from "../mailtrap/sendVerficationEmail.utils.js";

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ message: "All fields are required.", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists.", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = generateVerificationToken();

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires: Date.now() + 1 * 60 * 60 * 1000,
    });

    await newUser.save();

    //JWT Handle
    generateJwtTokenAndSetCookie(res, newUser._id);

    await sendVerficationEmail(newUser.email, verificationToken);

    res.status(201).json({
      message: "User created successfully.",
      success: true,
      user: {
        ...newUser._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("🚀 ~ signup ~ error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const login = async (req, res) => {
  res.send("Welcome login");
};

export const logout = async (req, res) => {
  res.send("Welcome logout");
};
