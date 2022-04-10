const routerSale = require('express').Router();
const saleService = require('../services/saleService');
const salesValidation = require('../middlewares/salesValidation');

const getAll = async (req, res) => {
  const sale = await saleService.getAll();
  res.status(200).json(sale);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getById(id);
  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
   }
   res.status(200).json(sale);
};

const createSales = async (req, res) => {
  const sales = req.body;
  const sale = await saleService.createSale(sales);
  res.status(201).json(sale);
};

// router.get('/', async (_req, res, _next) => {
//   const sale = await saleService.getAll();

//   res.status(200).json(sale);
// });

// router.get('/:id', async (req, res, _next) => {
//   const { id } = req.params;
//   const sale = await saleService.getById(id);

//   if (!sale || sale.length === 0) {
//    return res.status(404).json({ message: 'Sale not found' });
//   }
//   res.status(200).json(sale);
// });

routerSale.get('/', getAll);
routerSale.get('/:id', getById);
routerSale.post('/', salesValidation.saleIdValidation,
salesValidation.quantityValidation, createSales);

module.exports = {
  routerSale,
  getAll,
  getById,
  createSales,
};