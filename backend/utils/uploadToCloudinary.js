const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload image to Cloudinary
const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { resource_type: 'auto' }, // Automatically detect the file type
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error); // Log Cloudinary upload error
          reject(error);
        }
        console.log("Cloudinary upload success:", result); // Log successful upload
        resolve(result);
      }
    ).end(file.buffer);
  });
};

module.exports = { uploadImage };
