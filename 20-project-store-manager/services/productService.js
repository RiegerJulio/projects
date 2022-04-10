const productModel = require('../models/productModel');

const getAll = async () => productModel.getAll();

const getById = async (id) => {
  const product = await productModel.getById(id);
  if (!product) {
    return null;
  }
  return product;
};

const createProduct = async ({ name, quantity }) => {
  const getAllProducts = await getAll();
  if (getAllProducts.find((product) => product.name === name)) {
    return null;
  }
  return productModel.createProduct({ name, quantity });
};

const updateProduct = async ({ id, name, quantity }) => {
  const product = await getById(id);
  if (!product) {
    return null;
  }
  return productModel.updateProduct({ id, name, quantity });
};

const deleteProduct = async (id) => {
  const product = await getById(id);
  if (!product) {
    return null;
  }
  return productModel.deleteProduct(id);
};

module.exports = { getAll, getById, createProduct, updateProduct, deleteProduct };