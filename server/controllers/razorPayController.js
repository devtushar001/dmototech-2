import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { razorPayInstance } from "../config/razorPayConfig.js";
import crypto from "crypto";

const frontend_url = process.env.FRONTEND_URL;
const razorPayKeyId = process.env.RAZORPAY_KEY_ID;
const razorPayKeySecret = process.env.RAZORPAY_KEY_SECRET;

export const createRazorPayOrderController = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

    const { items, amount, address } = req.body;
    if (!items || !amount || !address)
      return res.status(400).json({ success: false, message: "All fields are required" });

    const savedOrder = await new orderModel({ userId, items, amount, address }).save();
    if (!savedOrder) return res.status(500).json({ success: false, message: "Failed to save order" });

    await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });


    const rPI = razorPayInstance(razorPayKeyId, razorPayKeySecret);
    const options = {
      amount: Math.round(Number(amount) * 100), 
      currency: "INR",
      receipt: `receipt_order_${savedOrder._id}`,
    };

    const order = await rPI.orders.create(options); 
    if (!order) return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
    savedOrder.razorpayOrder = {
      id: order.id,    
      currency: 'INR',     
      amount: Math.round(Number(amount)) 
    };
    await savedOrder.save();


    res.status(200).json({
      success: true,
      message: "Order created successfully",
      razorpayOrder: order,
      orderId: savedOrder._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
};

export const verifyRazorPayOrderController = async (req, res) => {
  console.log(req.body);
  try {
    const { order_id, payment_id, signature } = req.body;
    if (!order_id || !payment_id || !signature)
      return res.status(400).json({ success: false, message: "Missing required fields" });

    const order = await orderModel.findOne({ "razorpayOrder.id": order_id });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (order.payment) {
      return res.status(400).json({ success: false, message: "Payment already verified" });
    }

    const hmac = crypto.createHmac("sha256", razorPayKeySecret);
    hmac.update(`${order_id}|${payment_id}`);
    const expectedSignature = hmac.digest("hex");

    if (expectedSignature === signature) {
      order.payment = true;
      console.log(order);
      await order.save();
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      console.log("Failled Order")
      console.log(order)
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const userOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

    const orders = await orderModel.find({ userId });
    if (!orders.length) return res.status(404).json({ success: false, message: "No orders found" });

    res.status(200).json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    if (!orders.length) return res.status(404).json({ success: false, message: "No orders found" });

    res.status(200).json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    if (!orderId || !status) return res.status(400).json({ success: false, message: "Order ID and status are required" });

    const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, message: "Order status updated successfully", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "Order ID is required" });

    const deletedOrder = await orderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, message: "Order deleted successfully", data: deletedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
