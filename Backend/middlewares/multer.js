const multer = require('multer');
const path = require('path');

// Define storage options for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file to make it unique
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'), false); // Reject file
  }
};

// Initialize multer with the defined storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
