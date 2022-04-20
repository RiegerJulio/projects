const categoryRoutes = require('express').Router();
const categoryController = require('../controllers/categoryController');
const { tokenValidations, categoryValidations } = require('../middlewares/validations');

categoryRoutes.get('/', tokenValidations, categoryController.getCategories);
categoryRoutes.post('/', tokenValidations, categoryValidations, categoryController.createCategory);

module.exports = categoryRoutes;
