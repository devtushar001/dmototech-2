import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import accessoryRouter from './routes/accessoryRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import categoryRouter from './routes/categoryRoute.js'; 
import orderRouter from './routes/orderRoute.js';
import nestedCtgRouter from './routes/nestedCtgRoute/nestedCtgRoute.js';
import ratingRoute from './routes/ratingRoute.js';
import razorPayRouter from './routes/razorPayRouter.js';
import imageRouter from './routes/imageRoutes.js';
import cloudinarySetup from './config/cloudinarySetup.js';
import adminUserRouter from './routes/adminUserRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongo_url = process.env.MONGODB_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudApiKey = process.env.CLOUDINARY_API_KEY;
const cloudApiSecret = process.env.CLOUDINARY_API_SECRET;

if (!mongo_url) {
    console.error(" Error: MONGODB_URL is not defined in .env file.");
    process.exit(1); 
}

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

connectDB(mongo_url).catch((err) => {
    console.error(" MongoDB Connection Failed:", err);
    process.exit(1); 
});
cloudinarySetup(cloudName, cloudApiKey, cloudApiSecret);

// first route for the testing purpose
app.get('/', (req, res) => {
    return res.status(201).json({
        success:true,
        message: `Server running ${port}`
    })
});

// others route
app.use('/api/accessory', accessoryRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/category', categoryRouter);
app.use('/api/nested-category', nestedCtgRouter);
app.use('/api/ratings', ratingRoute);
app.use('/api/razorpay', razorPayRouter);
app.use('/api/images', imageRouter);
app.use('/api/admin-user', adminUserRouter)

app.use((err, req, res, next) => {
    console.error(" Global Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
