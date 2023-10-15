const multer = require("multer");
const path = require("path");

const storageImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(null, false);
    }
  },
});

const uploadImage = multer({
  storage: storageImage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb({ message: "this is file not supported" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 },
});
// const multipleImages = uploadImage.fields([{ name: "image", maxcontent: 3 }]);

module.exports = uploadImage;
