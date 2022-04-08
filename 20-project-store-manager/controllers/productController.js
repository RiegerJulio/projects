const router = require('express').Router();
const productService = require('../services/productService');

router.get('/', async (_req, res, _next) => {
  const products = await productService.getAll();

  res.status(200).json(products);
});

router.get('/:id', async (req, res, _next) => {
  const product = await productService.getById(req.params.id);

  if (product === null) {
    res.status(404).send({ message: 'Not found' });
  }
  res.status(200).json(product);
});

module.exports = router;