const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.findAll();
  res.json(expenses);
};

exports.createExpense = async (req, res) => {
  const newExpense = await Expense.create(req.body);
  res.status(201).json(newExpense);
};

exports.deleteExpense = async (req, res) => {
  await Expense.destroy({
    where: { id: req.params.id },
  });
  res.json({
    message: "Expense deleted",
  });
};

exports.updateExpense = async (req, res) => {
  await Expense.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({
    message: "Expense updated",
  });
};
