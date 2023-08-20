import { v2 as cloudinary } from "cloudinary";

const myconfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload;

// Log the configuration
console.log("Credenciales de cloudinary", cloudinary.config());
export default myconfig;
