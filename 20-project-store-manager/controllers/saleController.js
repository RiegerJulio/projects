const router = require('express').Router();
const saleService = require('../services/saleService');

router.get('/', async (_req, res, _next) => {
  const sale = await saleService.getAll();

  res.status(200).json(sale);
});

router.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  const sale = await saleService.getById(id);

  if (!sale || sale.length === 0) {
   return res.status(404).json({ message: 'Sale not found' });
  }
  res.status(200).json(sale);
});

module.exports = router;