require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
const sequelize = require("../config/database");
const Category = require("../models/Category");

const migrate = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await sequelize.sync();
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
};

migrate();
