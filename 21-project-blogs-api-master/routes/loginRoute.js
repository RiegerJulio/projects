const loginRoutes = require('express').Router();
const userController = require('../controllers/userController');
const { checkEmailCredential, checkPasswordCredential } = require('../middlewares/validations');

loginRoutes.post('/', checkEmailCredential, checkPasswordCredential, userController.userLogin);

module.exports = loginRoutes;