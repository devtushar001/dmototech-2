import express from 'express';
// const express = require('express');
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import accessoryRouter from './routes/accessoryRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import categoryRouter from './routes/categoryRoute.js'; // Consistent import
import orderRouter from './routes/orderRoute.js';
import nestedCtgRouter from './routes/nestedCtgRoute/nestedCtgRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import ratingRoute from './routes/ratingRoute.js';
import razorPayRouter from './routes/razorPayRouter.js';

// Load Environment Variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000; // Use .env PORT or fallback to 5000
const mongo_url = process.env.MONGODB_URL;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // No need for body-parser

// MongoDB Connection with Error Handling
connectDB(mongo_url);

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);
const __dirname = path.dirname(__filename);
console.log(__dirname);

// Serve Static Files
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use('/catupload', express.static(path.join(__dirname, 'catupload')));
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.use('/admin', express.static(path.join(__dirname, 'admin', 'dist')));

// API Endpoints
app.use('/api/accessory', accessoryRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/nested-category', nestedCtgRouter);
app.use('/api/ratings', ratingRoute);
app.use('/api/razorpay', razorPayRouter);

// Catch-all handler for client-side routing
app.get('*', (req, res) => {
  if (req.path.startsWith('/admin')) {
    res.sendFile(path.join(__dirname, 'admin', 'dist', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  }
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
