import express from "express";
import multer from "multer";
import { deleteImageController, getImageController, uploadImageController } from "../Controller/imageController.js";

const imageRouter = express.Router();

const storage = multer.memoryStorage(); 

const upload = multer({ storage });

imageRouter.post("/upload", upload.single("image"), uploadImageController);
imageRouter.get("/image", getImageController);
imageRouter.post("/delete", deleteImageController);


export default imageRouter;