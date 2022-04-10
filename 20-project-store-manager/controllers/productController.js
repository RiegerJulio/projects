const routerProduct = require('express').Router();
const productService = require('../services/productService');
const productsValidation = require('../middlewares/productsValidation');

const getAll = async (req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getById(id);
  if (!product || product.length === 0) {
    res.status(404).send({ message: 'Product not found' });
  }
  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productService.createProduct({ name, quantity });
  if (!product) {
    res.status(409).send({ message: 'Product already exists' });
  }
  res.status(201).json(product);
};

// router.get('/', async (_req, res, _next) => {
//   const products = await productService.getAll();

//   res.status(200).json(products);
// });

// router.get('/:id', async (req, res, _next) => {
//   const { id } = req.params;
//   const product = await productService.getById(id);

//   if (!product || product.length === 0) {
//     res.status(404).send({ message: 'Product not found' });
//   }
//   res.status(200).json(product);
// });

routerProduct.get('/', getAll);
routerProduct.get('/:id', getById);
routerProduct.post('/', productsValidation.nameValidation,
  productsValidation.quantityValidation, createProduct);

module.exports = {
  routerProduct,
  getAll,
  getById,
  createProduct,
};
