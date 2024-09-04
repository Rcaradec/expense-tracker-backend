const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const path = require("path");
const Task = require("./models/Task");
const Category = require("./models/Category");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sync models with DB
sequelize.sync().then(async () => {
  console.log("Database & tables created!");
});

// App routes
app.get("/tasks", async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const newTask = await Task.create(req.body);
  res.json(newTask);
});

app.delete("/tasks/:id", async (req, res) => {
  await Task.destroy({
    where: { id: req.params.id },
  });
  res.json({
    message: "Task deleted",
  });
});

app.put("/tasks/:id", async (req, res) => {
  await Task.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({
    message: "Task updated",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
