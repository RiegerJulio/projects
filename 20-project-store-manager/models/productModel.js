const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products ORDER BY id');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return result[0];
};

const createProduct = async ({ name, quantity }) => { 
  const [result] = await
    connection.execute('INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity]);

  return {
    id: result.insertId,
    name,
    quantity,
  };
};

const updateProduct = async ({ id, name, quantity }) => {
  const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
  await connection.execute(query, [name, quantity, id]);
  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id = ?';
  await connection.execute(query, [id]);
};

module.exports = { getAll, getById, createProduct, updateProduct, deleteProduct };