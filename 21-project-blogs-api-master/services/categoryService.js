const { Category } = require('../models');

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const createCategory = async (category) => {
  const create = Category.create(category);
  return create;
};

module.exports = { getCategories, createCategory };