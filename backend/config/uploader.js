// Import the cloudinary module
const cloudinary = require("./cloudinary");

const uploadOnCloudinary = (file) => {
  return cloudinary.uploader.unsigned_upload(file);
};

const deleteFromCloudinary = (file) => {
  return cloudinary.uploader.destroy(file);
};

exports.multiFileUploader = async (images) => {
  const cloudinaryImageUploadMethod = async (file) => {
    const image = await uploadOnCloudinary(file);
    return image;
  };

  var imageUrlList = [];

  for (var i = 0; i < images.length; i++) {
    var localFilePath = images[i];

    // Upload the local image to Cloudinary
    // and get image url as response
    var result = await cloudinaryImageUploadMethod(localFilePath);
    imageUrlList.push(result);
  }
  const uploaded = imageUrlList.map((v) => {
    return {
      _id: v.public_id,
      url: v.secure_url,
    };
  });
  return uploaded;
};
