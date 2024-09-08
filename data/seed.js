require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const sequelize = require("../config/database");
const Expense = require("../models/Expense");
const Category = require("../models/Category");

const insertInitialData = async () => {
  await sequelize.sync({ force: true });
  console.log("Database & tables created!");

  const categoriesToInsert = [
    { name: "Alimentaire" },
    { name: "Utilitaire" },
    { name: "Loisirs" },
  ];
  await Category.bulkCreate(categoriesToInsert);
  console.log("Initial categories inserted!");

  const expensesToInsert = [
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
  await Expense.bulkCreate(expensesToInsert);
  console.log("Initial expenses inserted!");
};

insertInitialData()
  .then(() => {
    console.log("Data insertion completed!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error inserting data:", err);
    process.exit(1);
  });
