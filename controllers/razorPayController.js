import { razorPayInstance } from "../config/razorPayConfig.js";
import crypto from 'crypto';

const razorPayKeyId = process.env.RAZORPAY_KEY_ID
const razorPayKeySecret = process.env.RAZORPAY_KEY_SECRET

export const createRazorPayOrderController = async (req, res) => {
  if (!razorPayKeyId || !razorPayKeySecret) {
    return res.status(404).json({
      success: false,
      message: `Razorpay credentials not found`
    });
  }

  const { courseId, amount } = req.body;
  // console.log(razorPayKeyId, razorPayKeySecret);
  // console.log(courseId, amount);

  const rPI = razorPayInstance(razorPayKeyId, razorPayKeySecret);

  const options = {
    amount: amount * 100, // Amount in paise
    currency: "INR",
    receipt: `receipt_order_${courseId}` // Using the courseId as part of the receipt to keep it unique
  };

  try {
    const order = await rPI.orders.create(options); // Use async/await here
    console.log(order)
    return res.status(200).json(order); // Send the created order to the client
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `Razorpay order creation failed: ${err.message}`
    });
  }
};


export const verifyRazorPayOrderController = async (req, res) => {
  console.log("hello")
  const { order_id, payment_id, signature } = req.body;
console.log(req.body)
  // Validate the presence of the required fields
  if (!order_id || !payment_id || !signature) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields"
    });
  }

  // Create HMAC object for signature verification
  const hmac = crypto.createHmac("sha256", razorPayKeySecret);
  hmac.update(`${order_id}|${payment_id}`);

  const rPS = hmac.digest('hex');

  if (rPS === signature) {
    return res.status(200).json({
      success: true,
      message: "Payment verified successfully"
    });
  } else {
    return res.status(400).json({
      success: false,
      message: "Payment verification failed"
    });
  }
};