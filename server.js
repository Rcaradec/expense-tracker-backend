const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const expenseRoutes = require("./routes/expenseRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sync models with DB
sequelize.sync().then(async () => {
  console.log("Database & tables created!");
});

app.use("/expenses", expenseRoutes);
app.use("/categories", categoryRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
