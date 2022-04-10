const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { routerProduct } = require('./controllers/productController');
const { routerSale } = require('./controllers/saleController');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routerProduct);
app.use('/sales', routerSale);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
