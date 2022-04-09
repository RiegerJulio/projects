const saleModel = require('../models/saleModel');

const salesFormatting = (sales) => ({
  saleId: sales.id,
  date: sales.date,
  productId: sales.product_id,
  quantity: sales.quantity,
});

const salesFormattingId = (sale) => ({
  date: sale.date,
  productId: sale.product_id,
  quantity: sale.quantity,
});

const getAll = async () => {
  const result = await saleModel.getAll();
  return result.map(salesFormatting);
};

const getById = async (id) => {
  const sale = await saleModel.getById(id);
  if (!sale) {
    throw new Error('Sale not found');
  }
  return sale.map(salesFormattingId);
};

module.exports = { getAll, getById };