import express from "express";
import { verifyToken } from "../middlewares/adminAuth.js";
import { adminUserLoginController, adminUserSignupController } from "../controllers/adminUserController.js";

const adminUserRouter = express.Router();

adminUserRouter.post("/register", adminUserSignupController);
adminUserRouter.post("/login", adminUserLoginController);

export default adminUserRouter;
