import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { razorPayInstance } from "../config/razorPayConfig.js";
import crypto from "crypto";

const frontend_url = process.env.FRONTEND_URL;
const razorPayKeyId = process.env.RAZORPAY_KEY_ID;
const razorPayKeySecret = process.env.RAZORPAY_KEY_SECRET;

// Create Razorpay Order
export const createRazorPayOrderController = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, message: "User not authenticated" });

    const { items, amount, address } = req.body;
    if (!items || !amount || !address)
      return res.status(400).json({ success: false, message: "All fields are required" });

    // Save order to database
    const savedOrder = await new orderModel({ userId, items, amount, address }).save();
    if (!savedOrder) return res.status(500).json({ success: false, message: "Failed to save order" });

    await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });


    const rPI = razorPayInstance(razorPayKeyId, razorPayKeySecret);
    // Create Razorpay order
    const options = {
      amount: Math.round(Number(amount) * 100), // Convert to paise
      currency: "INR",
      receipt: `receipt_order_${savedOrder._id}`,
    };

    const order = await rPI.orders.create(options); // Use async/await here
    if (!order) return res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
    savedOrder.razorpayOrder = {
      id: order.id,        // Razorpay order ID
      currency: 'INR',     // Currency
      amount: Math.round(Number(amount)) // Ensure amount is a rounded number
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




// Verify Razorpay Payment
export const verifyRazorPayOrderController = async (req, res) => {
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

    // Generate the expected signature
    const hmac = crypto.createHmac("sha256", razorPayKeySecret);
    hmac.update(`${order_id}|${payment_id}`);
    const expectedSignature = hmac.digest("hex");

    if (expectedSignature === signature) {
      order.payment = true;
      await order.save();
      return res.status(200).json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};


// User Orders
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

// List All Orders
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    if (!orders.length) return res.status(404).json({ success: false, message: "No orders found" });

    res.status(200).json({ success: true, message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// Update Order Status
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

// Delete Order
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
