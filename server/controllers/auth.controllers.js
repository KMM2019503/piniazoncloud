import bcrypt from "bcryptjs";

import crypto from "crypto";

import { generateVerificationToken } from "../utils/generateVerificationToken.utils.js";
import { generateJwtTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie.utils.js";

import {
  sendVerficationEmail,
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendResetPasswordSuccessfulEmail,
} from "../mailtrap/handleEmail.js";

import { User } from "../models/user.models.js";

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
      message:
        "Account created successfully! Please check your email to verify your account.",
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
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required.", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid User.", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials.", success: false });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in.",
        success: false,
      });
    }

    // Generate JWT token and set it as a cookie
    generateJwtTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful.",
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(201).json({ success: true, message: "Logout successfully" });
};

export const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired verfication token.",
        success: false,
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.username);

    res.status(201).json({
      message: "Token Verifiction successful.",
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("🚀 ~ verifyToken ~ error:", error);
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required.", success: false });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid User.", success: false });
    }

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 1 * 60 * 60 * 1000;

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = resetPasswordExpires;

    user.save();

    await sendResetPasswordEmail(
      user.email,
      `${process.env.FRONT_END_URL}/reset-password/${resetPasswordToken}`
    );

    res.status(201).json({
      message: `A password reset link has been sent to your email.`,
      success: true,
    });
  } catch (error) {
    console.log("🚀 ~ forgotPassword ~ error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    if (!newPassword) {
      return res
        .status(400)
        .json({ message: "New password is required.", success: false });
    }

    const user = await User.findOne({ resetPasswordToken: token });

    if (!user || user.resetPasswordExpires < Date.now()) {
      return res
        .status(404)
        .json({ message: "Invalid or expired token.", success: false });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    await sendResetPasswordSuccessfulEmail(user.email);

    res.status(200).json({
      message: "Password reset successful.",
      success: true,
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
      success: false,
    });
  }
};
