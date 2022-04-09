const router = require('express').Router();
const productService = require('../services/productService');

router.get('/', async (_req, res, _next) => {
  const products = await productService.getAll();

  res.status(200).json(products);
});

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const product = await productService.getById(id);

  if (!product || product.length === 0) {
    res.status(404).send({ message: 'Product not found' });
  }
  res.status(200).json(product);
});

module.exports = router;