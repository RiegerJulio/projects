const productModel = require('../models/productModel');

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
    return null;
  }
  return product;
};

module.exports = { getAll, getById };