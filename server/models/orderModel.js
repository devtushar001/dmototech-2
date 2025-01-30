import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        name: String,
        price: {
          oldPrice: Number,
          newPrice: Number,
          currency: String,
        },
        images: {
          mainImage: String,
          secondImage: String,
          thirdImage: String,
          fourthImage: String,
        },
        additionalInfo: {
          material: String,
          compatibility: [String],
        },
        quantity: Number,
      },
    ],
    amount: { type: Number, required: true },
    address: {
      firstName: String,
      lastName: String,
      email: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
      phone: String,
    },
    status: { type: String, default: "Pending" },
    payment: { type: Boolean, default: false },
    razorpayOrder: {
      id: String, // Razorpay Order ID
      currency: String,
      amount: Number,
    },
    date: { type: Date, default: Date.now },
  });
  
  const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
  
  export default orderModel;