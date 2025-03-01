import imageModel from "../models/imageModel.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mern-uploads" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file.buffer); // Upload buffer to Cloudinary
    });

    const savedImage = await imageModel.create({
      imageUrl: result.secure_url,
      imageId: result.public_id
    });

    res.status(200).json({ message: "Image uploaded successfully!", savedImage });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};

export const getImageController = async (req, res) => {
  try {
    const images = await imageModel.find().select("imageUrl imageId"); // FIXED: use imageId

    if (!images.length) {
      return res.status(404).json({ message: "No images found" });
    }

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImageController = async (req, res) => {
  try {
    const {id} = req.body;

    const image = await imageModel.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await cloudinary.uploader.destroy(image.imageId); // FIXED: use imageId instead of publicId

    await imageModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: "Image deletion failed", details: error.message });
  }
};
