const cloudinary = require("cloudinary").v2;

export const myconfig = cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

cloudinary.uploader.upload;

// Log the configuration
console.log("Credenciales de cloudinary", cloudinary.config());
module.myconfig = myconfig;
