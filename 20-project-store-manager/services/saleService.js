const saleModel = require('../models/saleModel');

const salesFormatting = (sales) => ({
  saleId: sales.sale_id,
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

const createSale = async (sales) => {
  const saleId = await saleModel.createSaleId();
  await sales.forEach((sale) => saleModel.createSale(saleId, sale.productId, sale.quantity));
  return ({ id: saleId, itemsSold: sales });
};

const updateSale = async (id, sale) => {
  const result = sale.forEach((sales) => saleModel.updateSale(id, sales.productId, sales.quantity));
  return result;
};

const deleteSale = async (id) => {
  const result = await getById(id);
  if (result.length <= 0) {
    return null;
  }
  return saleModel.deleteSale(id);
};

module.exports = { getAll, getById, createSale, updateSale, deleteSale };