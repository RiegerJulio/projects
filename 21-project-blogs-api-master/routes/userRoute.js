const userRoutes = require('express').Router();
const userController = require('../controllers/userController');
const { validateName, validateEmail,
  validatePassword, tokenValidations } = require('../middlewares/validations');

userRoutes.get('/', userController.findAllUsers);
userRoutes.get('/:id', tokenValidations, userController.findById);
userRoutes.post('/', validateName, validateEmail, validatePassword, userController.createUser);

module.exports = userRoutes;
