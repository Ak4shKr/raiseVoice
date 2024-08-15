import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Complaint from "../models/complaintModel.js";
import { otpGenerator } from "../utils/otpGenerator.js";
import Otp from "../models/otpModel.js";
import { sendEmail } from "../utils/emailSender.js";

export const userRegister = async (req, res) => {
  try {
    // const { avatar } = req.files;
    // if (!avatar) {
    //   res.status(400).json({ error: "Please upload an image" });
    //   return;
    // }

    const { name, username, email, password } = req.body;

    // const cloudinaryResponse = await cloudinary.uploader.upload(
    //   avatar.tempFilePath
    // );
    // if (!cloudinaryResponse || cloudinaryResponse.error) {
    //   console.error(
    //     "Cloudinary error:",
    //     cloudinaryResponse.error || "Unknown cloudinary error!"
    //   );
    // }
    // const avatarUrl = cloudinaryResponse.secure_url;
    // const avatarPublicId = cloudinaryResponse.public_id;
    const user = new User({ name, username, email, password });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.json("Please enter all required field.");
      return;
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(404).json("user not found");
      return;
    }
    var token;
    // console.log(user);
    // console.log(user.email);
    // console.log(password, user.password);
    if (password === user.password) {
      token = jwt.sign({ id: user._id, email: user.email }, "secret", {
        expiresIn: "1h",
      });
    } else {
      return res.status(400).json("invalid credential");
    }

    res.status(200).json({ message: "login successful", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json("user not found");
      return;
    }
    const otp = await otpGenerator();
    console.log(otp);
    const sendOTP = await sendEmail({
      email: email,
      subject: "OTP for password reset",
      text: `Your OTP is ${otp}, for your password reset. it is valid for only 2 minute.
      \nTeam: CatchCorruption`,
    });
    console.log(sendOTP);
    // send otp to user email
    // store otp
    // const isalready = await Otp.findOne({ email: email });
    // if (isalready) {
    //   await Otp.findOneAndDelete({ email: email });
    // }
    const newOtp = new Otp({ email: email, otp: otp });
    await newOtp.save();
    // console.log(newOtp);
    res.status(200).json({ message: "OTP sent successfully" });
    // return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const otpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Otp.findOne({ email: email });
    if (!user) {
      res.status(404).json("OTP expired, retry again");
      return;
    }
    const isMatch = otp == user.otp;
    if (!isMatch) {
      res.status(400).json("Invalid OTP");
      return;
    }
    const token = jwt.sign(
      { id: user._id, email: email },
      "secret  ",
      (err, token) => {
        if (err) {
          res.status(400).json("Token not generated");
          return;
        }
        res
          .status(200)
          .json({ message: "OTP verified successfully", token: token });
      }
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    // const {token } = req.headers;
    if (!token) {
      res.status(400).json("Token not found");
      return;
    }
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "token not present, retry again",
          success: false,
        });
      } else {
        decoded.password = req.body.password;
        decoded.save();
        res.status(200).json("Password changed successfully");
        return;
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getComplaintsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const complaints = await Complaint.find({ user_id });
    res.json(complaints);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
