import express from "express";
import {
  getComplaintsByUser,
  userRegister,
  userLogin,
  forgetPassword,
  otpVerification,
} from "./controllers/userController.js";
import {
  fileComplaint,
  getCorrouptEmployees,
  getEmployeeComplaints,
  raiseTicket,
  removeEmployee,
} from "./controllers/employeeController.js";
import { authMiddleware, isadmin } from "./middlewares/authMiddlewares.js";
import { sendEmail } from "./utils/emailSender.js";
import { uploadImage, getAssetInfo } from "./controllers/imageController.js";

const router = express.Router();

//user routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/forgetpassword", forgetPassword);
router.post("/otp-verifaication", otpVerification);
router.post("/complaint", authMiddleware, fileComplaint);
router.get("/corroupt", authMiddleware, getCorrouptEmployees);
router.get("/complaints/:employee_id", authMiddleware, getEmployeeComplaints);
router.get("/complaints/user/:user_id", authMiddleware, getComplaintsByUser);

//employee routes
router.post("/employee/raiseticket", raiseTicket);
router.post("/sendemail", sendEmail);
//admin routes
router.post("/removeemployee", isadmin, removeEmployee);

//image routes
router.post("/upload", async (req, res) => {
  const publicId = await uploadImage(req.body.imagePath);
  res.json(publicId);
});

export default router;
