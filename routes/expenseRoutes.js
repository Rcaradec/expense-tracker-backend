const express = require("express");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.get("/", expenseController.getExpenses);
router.get("/:id", expenseController.getOneExpense);
router.post("/", expenseController.createExpense);
router.put("/:id", expenseController.updateExpense);
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;
