const connection = require('./connection');

const sales = 'StoreManager.sales';
const salesProducts = 'StoreManager.sales_products';

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT sale_id, date, product_id, quantity
      FROM ${sales}
        INNER JOIN ${salesProducts} 
        ON (${sales}.id = ${salesProducts}.sale_id)`,
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity
      FROM ${sales}
        INNER JOIN ${salesProducts}
        ON (${sales}.id = ${salesProducts}.sale_id)
      WHERE sale_id = ?
      ORDER BY sale_id`, [id],
  );
  // if (sales.length === 0) return null;
  return result;
};

const createSaleId = async () => {
  const [result] = await connection.execute(
    `INSERT INTO ${sales} (date) VALUES (NOW())`,
  );
  return result.insertId;
};

const createSale = async (saleId, productId, quantity) => {
  const result = await connection.execute(
    `INSERT INTO ${salesProducts} (sale_id, product_id, quantity) VALUES (?, ?, ?)`,
      [saleId, productId, quantity],
  );
  return result;
};

const updateSale = async (saleId, productId, quantity) => {
  const result = await connection.execute(
    `UPDATE ${salesProducts} SET quantity = ? WHERE sale_id = ? AND product_id = ?`,
      [quantity, saleId, productId],
  );
  return result;
};

const deleteSale = async (id) => {
  await connection.execute(
    `DELETE FROM ${sales} WHERE id = ?`,
      [id],
  );
};

module.exports = { getAll, getById, createSaleId, createSale, updateSale, deleteSale };
