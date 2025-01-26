const Task = require('../models/Task');

// Create a new task
exports.addTask = async (req, res) => {
  try {
    const { name, description, status = 'pending' } = req.body;
    console.log("Received task data:", { name, description, status });
    // Validate input
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    // Create a new task linked to the authenticated user
    const newTask = new Task({
      user: req.user.id, // Attach user ID from the authenticated user
      name,
      description,
      status,
    });

    await newTask.save();
    return res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks for the authenticated user
exports.getTasks = async (req, res) => {
  try {
    // Find tasks only for the authenticated user
    const tasks = await Task.find({ user: req.user.id });
    return res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Update task status (e.g., Pending -> Completed -> Done)
exports.updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (!['pending', 'completed', 'done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Update task only if it belongs to the authenticated user
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ task });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete task only if it belongs to the authenticated user
    const task = await Task.findOneAndDelete({ _id: id, user: req.user.id });

    if (!task) {
      return res.status(404).json({  success:false, message: 'Task not found' });
    }

    return res.status(200).json({ success:true, message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success:false, message: 'Server error' });
  }
};
