const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products ORDER BY id');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result;
  // if (products.length === 0) return null;
};

module.exports = { getAll, getById };