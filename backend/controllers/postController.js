const Post = require('../models/Post');
const cloudinary = require('../utils/uploadToCloudinary');

// Create a new post
exports.addPost = async (req, res) => {
  console.log("Request Body:", req.body);
  const { caption } = req.body;

  // Check if a photo file is provided
  if (!req.file) {
    return res.status(400).json({ message: 'Photo is required' });
  }

  try {
    console.log("File received:", req.file); 
    // Upload image to Cloudinary
    const result = await cloudinary.uploadImage(req.file);
    console.log("Cloudinary Upload Result:", result); 
    // Create a new post with the photo URL
    const newPost = new Post({
      user: req.user.id,
      caption,
      photo: result.secure_url,
    });

    // Save post to the database
    await newPost.save();
    return res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    console.error("Error in addPost:", err); 
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
exports.getPosts = async (req, res) => {
  console.log("Request Headers:", req.headers); 
  try {
    const posts = await Post.find().populate('user', 'name email');
    return res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findOneAndDelete({ _id: id, user: req.user.id });
    if (!post) {
      return res.status(404).json({ message: 'Post not found or you do not have permission to delete' });
    }

    return res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
