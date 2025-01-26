const multer = require('multer');

// Multer configuration for file upload
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

module.exports = upload;
