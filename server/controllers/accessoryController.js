import AccessoryModel from "../models/accessoryModel.js";
import mongoose from "mongoose";
import fs from "fs";

const addAccessory = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      description,
      galleryImage,
      content,
      featuredImage,
      tags
    } = req.body;

    console.log(req.body)

    if (!name || !category || !price || !description || !featuredImage) {
      return res.json({ success: false, message: "Missing required fields" });
    }
    const newProduct = await AccessoryModel.create({
      name,
      category,
      price,
      description,
      galleryImage,
      content,
      featuredImage,
      tags
    });

    console.log("New Product Added:", newProduct);

    return res.json({
      success: true,
      message: "Accessory Added",
      data: newProduct, // ✅ Fixed variable name
    });
  } catch (error) {
    console.error("Add Accessory Error:", error);
    return res.json({
      success: false,
      message: "Error adding accessory: " + error.message,
    });
  }
};

// Fetch all accessories
const accessoryList = async (req, res) => {
  try {
    const accessories = await AccessoryModel.find({});
    return res.json({
      success: true,
      message: "Accessories fetched successfully",
      data: accessories,
    });
  } catch (error) {
    console.error("Accessory List Error:", error);
    return res.json({
      success: false,
      message: "Error fetching accessories: " + error.message,
    });
  }
};

// Remove an accessory
const removeAccessory = async (req, res) => {
  const productId = req.body.id;

  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.json({
      success: false,
      message: "Invalid or missing Product ID",
    });
  }

  try {
    const accessory = await AccessoryModel.findById(productId);
    if (!accessory) {
      return res.json({
        success: false,
        message: "Accessory not found",
      });
    }

    // ✅ Ensure `images` object exists before accessing properties
    const imagePaths = accessory.images
      ? [accessory.images.mainImage, accessory.images.secondImage, accessory.images.thirdImage, accessory.images.fourthImage].filter(Boolean)
      : [];

    // ✅ Properly check if there are images to delete
    if (imagePaths.length > 0) {
      imagePaths.forEach((path) => {
        const fullPath = `uploads${path}`;
        fs.unlink(fullPath, (err) => {
          if (err) console.error(`Failed to delete image: ${fullPath}`, err);
        });
      });
    }

    await accessory.deleteOne();
    return res.json({
      success: true,
      message: "Accessory removed successfully",
    });
  } catch (error) {
    console.error("Remove Accessory Error:", error);
    return res.json({
      success: false,
      message: "Error removing accessory: " + error.message,
    });
  }
};

export { addAccessory, accessoryList, removeAccessory };
