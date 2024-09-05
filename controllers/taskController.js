const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const newTask = await Task.create(req.body);
  res.json(newTask);
};

exports.deleteTask = async (req, res) => {
  await Task.destroy({
    where: { id: req.params.id },
  });
  res.json({
    message: "Task deleted",
  });
};

exports.updateTask = async (req, res) => {
  await Task.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({
    message: "Task updated",
  });
};
