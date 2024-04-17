const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: "dvzwvedra",
    api_key: "294787435149364",
    api_secret: "5HcEOWEeLkImWVuh3WoEdG-18Gk"
  });

// Function to upload file to Cloudinary
function uploadToCloudinary(filePath) {
  return cloudinary.uploader.upload(filePath, { folder: "images", public_id: Math.random().toString(36).substring(2) })
    .then((data) => {
      // console.log(data.secure_url);
      return data.secure_url;
    })
    .catch((err) => {
      console.error(err);
      throw err; // Re-throw the error to propagate it
    });
}

// Usage example



  module.exports = {
    uploadToCloudinary,
  };