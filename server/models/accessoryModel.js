import mongoose from "mongoose";

// Define schema for the product
const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        oldPrice: {
            type: Number,
            required: true,
        },
        newPrice: {
            type: Number,
            required: true,
        }
    },
    description: {
        type: String,
        required: true,
    },
    galleryImage: {
        type: Array,
        default: []
    },
    content: {
        type: String,
        default: ""
    },
    featuredImage: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
}, {timestamps: true})




const AccessoryModel = mongoose.models.accessory || mongoose.model('accessory', accessorySchema);
export default AccessoryModel;