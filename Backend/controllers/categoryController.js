const Category = require('../model/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name, createdBy: req.user.id });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category' });
  }
};
