import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import sendEmail from "../utils/SendEmail.js";




const generateOTP = () => Math.floor(100000 + Math.random() * 900000);


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, email and password are required" });
    }

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const otp = generateOTP();
    const otpExpire = Date.now() + 10 * 60 * 1000; 

   
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpire
    });

    
    await sendEmail(
      email,
      "Email Verification OTP",
      `<h2>Your OTP is ${otp}</h2>`
    );

    
    res.status(201).json({
      msg: "OTP sent to email",
      userId: user._id
    });

  } catch (error) {
    console.error("Signup Error:", error);

    
    if (error.code === 11000) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    res.status(500).json({ error: error.message });
  }
};



export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.otp !== otp || user.otpExpire < Date.now())
      return res.status(400).json({ msg: "Invalid OTP or expired" });

    user.verified = true;
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save();

    res.json({ msg: "Email Verified Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  if (!user.verified) return res.status(400).json({ msg: "Please verify email first" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.json({ msg: "Login successful", token }); 
};



export const Profile=async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};