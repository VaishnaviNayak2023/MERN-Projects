import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const task = await Task.create({ user: req.user._id, title, description, priority });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.priority = req.body.priority || task.priority;
  task.status = req.body.status || task.status;
  const updated = await task.save();
  res.json(updated);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  if (task.user.toString() !== req.user._id.toString()) return res.status(401).json({ message: 'Not authorized' });
  await task.deleteOne();
  res.json({ message: 'Task deleted' });
};
