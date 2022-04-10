const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products ORDER BY id');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result[0];
};

// create a product
const createProduct = async ({ name, quantity }) => { 
  const [result] = await
    connection.execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

module.exports = { getAll, getById, createProduct };