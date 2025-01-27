import express from "express";
import { createRazorPayOrderController, verifyRazorPayOrderController } from "../controllers/razorPayController.js";

const razorPayRouter = express.Router();

razorPayRouter.post('/create-order', createRazorPayOrderController);
razorPayRouter.post('/verify-order', verifyRazorPayOrderController);

export default razorPayRouter;