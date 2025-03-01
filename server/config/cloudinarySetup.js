import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();



const cloudinarySetup = (cloudeName, cloudApiKey, cloudApiSecret) => {
  cloudinary.config({
    cloud_name: cloudeName,
    api_key: cloudApiKey,
    api_secret: cloudApiSecret,
  });
}


export default cloudinarySetup;