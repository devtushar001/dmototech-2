import AdminUserModel from "../models/adminUserModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const adminUserSignupController = async (req, res) => {
  try {
    const { adminUserName, adminUserPassword, adminUserEmail } = req.body;

    if (!adminUserName || !adminUserPassword || !adminUserEmail) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingAdmin = await AdminUserModel.findOne({ adminUserEmail });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const newAdmin = await AdminUserModel.create({
      adminUserName,
      adminUserPassword,
      adminUserEmail,
    });

    return res.status(201).json({ success: true, message: "Signup successful", admin: newAdmin });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Error: ${error.message}` });
  }
};

export const adminUserLoginController = async (req, res) => {
  console.log(req.body)
  try {
    const { adminUserEmail, adminUserPassword } = req.body;

    if (!adminUserEmail || !adminUserPassword) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const admin = await AdminUserModel.findOne({ adminUserEmail });
    if (!admin || !admin.isAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const isPasswordMatch = await admin.comparePassword(adminUserPassword);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.adminUserEmail, isAdmin: admin.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: { id: admin._id, email: admin.adminUserEmail, isAdmin: admin.isAdmin },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: `Error: ${error.message}` });
  }
};

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied! No token provided." });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};
