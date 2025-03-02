import { v2 as cloudinary } from "cloudinary";
import imageModel from "../Models/ImageModel.js";

export const uploadImageController = async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "mern-uploads",
    });


    const savedImage = await imageModel.create({
      imageUrl: result.secure_url,
      imageId: result.public_id
    });

    return res.status(200).json({ message: "Image uploaded successfully!", savedImage });

  } catch (error) {
    res.status(500).json({ message: "Image upload failed", error });
  }
};


export const getImageController = async (req, res) => {
  try {
    const images = await imageModel.find().select("imageUrl publicId");

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
    const { id } = req.body;
    const image = await imageModel.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    await cloudinary.uploader.destroy(image.imageId);

    await imageModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Image deletion failed", details: error.message });
  }
};