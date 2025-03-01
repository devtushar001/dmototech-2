import express from "express";
import { createRazorPayOrderController, verifyRazorPayOrderController } from "../controllers/razorPayController.js";
import isAuth from "../middlewares/auth.js";

const razorPayRouter = express.Router();

razorPayRouter.post('/create-order', isAuth, createRazorPayOrderController);
razorPayRouter.post('/verify-order', isAuth, verifyRazorPayOrderController);

export default razorPayRouter;