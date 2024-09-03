const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const path = require("path");
console.log(
  "Chemin absolu de Task.js :",
  path.resolve(__dirname, "./models/Task")
);
const Task = require("./models/Task");
console.log("Contenu du module Task :", Task);

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sync models with DB
sequelize.sync().then(async () => {
  console.log("Database & tables created!");

  const tasksToInsert = [
    { description: "Lait", amount: 5, category: "Courses" },
    {
      description: "Vaisselle",
      amount: 8,
      category: "Utilitaire",
    },
    {
      description: "Repassage",
      amount: 10,
      category: "Utilitaire",
    },
    {
      description: "Pétanque",
      amount: 15,
      category: "Loisirs",
    },
    {
      description: "Ping-pong",
      amount: 35,
      category: "Loisirs",
    },
    {
      description: "Paic citron",
      amount: 3,
      category: "Courses",
    },
  ];

  await Task.bulkCreate(tasksToInsert);
  console.log("Initial data seeded");
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
