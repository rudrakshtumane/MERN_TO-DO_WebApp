const Task = require('../model/taskModel');

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, collaborators } = req.body;

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      createdBy: req.user.id,
      status,
      collaborators
    });

    const createdTask = await task.save();
    return res.status(201).send(createdTask);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id });
    return res.status(200).send(tasks);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, priority, status, collaborators } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    // Ensure the user requesting the update is the creator of the task
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized to update this task" });
    }

    // Update only the fields that are provided
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.collaborators = collaborators || task.collaborators;

    const updatedTask = await task.save();
    return res.status(200).send(updatedTask);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    // Ensure the user requesting the deletion is the creator of the task
    if (task.createdBy.toString() !== req.user.id) {
      return res.status(403).send({ message: "Unauthorized to delete this task" });
    }

   
    return res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};



module.exports = { createTask, getUserTasks, updateTask, deleteTask };