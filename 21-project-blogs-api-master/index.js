const express = require('express');

const userRoutes = require('./routes/userRoute');
const loginRoutes = require('./routes/loginRoute');
const categoryRoutes = require('./routes/categoryRoute');

const app = express();
app.use(express.json());

app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/categories', categoryRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
