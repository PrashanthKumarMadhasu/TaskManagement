const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middlewares/errorHandler');

const cors = require('cors');


dotenv.config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // This line allows credentials (cookies, authorization headers) to be sent
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
