const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

exports.createCategory = async (req, res) => {
  const newCategory = await Category.create(req.body);
  res.json(newCategory);
};

exports.deleteCategory = async (req, res) => {
  await Category.destroy({
    where: { id: req.params.id },
  });
  res.json({
    message: "Category deleted",
  });
};

exports.updateCategory = async (req, res) => {
  await Category.update(req.body, {
    where: { id: req.params.id },
  });
  res.json({
    message: "Category updated",
  });
};
