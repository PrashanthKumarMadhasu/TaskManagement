const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming User model exists to verify user

const authMiddleware = async (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key from environment variables

    // Find the user by decoded token data
    const user = await User.findById(decoded.id);
    console.log("Decoded token:", decoded);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    // Attach the user to the request object for use in the next middleware or route handler
    req.user = user;

    // Proceed to the next middleware/route handler
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
