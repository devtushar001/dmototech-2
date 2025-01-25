import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, { timestamps: true });

const ratingModel = mongoose.models.Rating || mongoose.model('Rating', ratingSchema);

export default ratingModel;
