const Expense = require("../models/Expense");

exports.getExpenses = async (req, res) => {
  const expenses = await Expense.findAll();
  res.json(expenses);
};

exports.getOneExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expense" });
  }
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
  try {
    await Expense.update(req.body, {
      where: { id: req.params.id },
    });
    const updatedExpense = await Expense.findByPk(req.params.id);
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: "Failed to update expense" });
  }
};
