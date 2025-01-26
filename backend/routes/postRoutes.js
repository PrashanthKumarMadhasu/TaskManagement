const express = require('express');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/fileUploadMiddleware'); // Multer middleware for file uploads

const router = express.Router();

// Create a new post (protected route with file upload)
router.post('/', authMiddleware, upload.single('photo'), postController.addPost);

// Get all posts (protected route)
router.get('/', authMiddleware, postController.getPosts);

// Delete a post by ID (protected route)
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
