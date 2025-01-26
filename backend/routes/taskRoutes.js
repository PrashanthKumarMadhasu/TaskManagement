const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new task (protected)
router.post('/', authMiddleware, taskController.addTask);

// Get all tasks (protected)
router.get('/', authMiddleware, taskController.getTasks);

// Update a task status (protected)
router.put('/:id', authMiddleware, taskController.updateTaskStatus);

// Delete a task (protected)
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
