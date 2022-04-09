const productModel = require('../models/productModel');

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

module.exports = { getAll, getById };