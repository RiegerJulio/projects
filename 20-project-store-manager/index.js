const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

// app.use('/products', require('./controllers/productController'));
// app.use('/sales', require('./controllers/saleController'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
