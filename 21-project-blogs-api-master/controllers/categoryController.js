const CategoryService = require('../services/categoryService');

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await CategoryService.createCategory(req.body); 
    return res.status(201).json(category);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getCategories, createCategory };
