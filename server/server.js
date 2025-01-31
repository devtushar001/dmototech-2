import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import accessoryRouter from './routes/accessoryRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import categoryRouter from './routes/categoryRoute.js'; // Consistent import
import orderRouter from './routes/orderRoute.js';
import nestedCtgRouter from './routes/nestedCtgRoute/nestedCtgRoute.js';
import ratingRoute from './routes/ratingRoute.js';
import razorPayRouter from './routes/razorPayRouter.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import imageRouter from './routes/imageRoutes.js';
import cloudinarySetup from './config/cloudinarySetup.js';

// Load Environment Variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongo_url = process.env.MONGODB_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudApiKey = process.env.CLOUDINARY_API_KEY;
const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;

// Handle missing MongoDB URL
if (!mongo_url) {
    console.error("❌ Error: MONGODB_URL is not defined in .env file.");
    process.exit(1); // Exit the process if MongoDB URL is missing
}

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with Error Handling
connectDB(mongo_url).catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1); // Exit process on failure
});
cloudinarySetup(cloudName, cloudApiKey, cloudApiSecret);

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log("📁 Server Root Directory:", __dirname);

// Serve Static Files Only If They Exist
const staticDirs = [
    { route: "/images", folder: "uploads" },
    { route: "/catupload", folder: "catupload" },
    { route: "/", folder: "client/dist" },
    { route: "/admin", folder: "admin/dist" },
];

staticDirs.forEach(({ route, folder }) => {
    const fullPath = path.join(__dirname, folder);
    if (fs.existsSync(fullPath)) {
        app.use(route, express.static(fullPath));
        console.log(`✅ Serving static files from: ${fullPath}`);
    } else {
        console.warn(`⚠️ Warning: Static folder "${folder}" does not exist. Skipping.`);
    }
});

// API Endpoints
app.use('/api/accessory', accessoryRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/nested-category', nestedCtgRouter);
app.use('/api/ratings', ratingRoute);
app.use('/api/razorpay', razorPayRouter);
app.use('/api/images', imageRouter)

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("❌ Global Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
