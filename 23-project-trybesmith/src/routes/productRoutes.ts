import { Router } from 'express';
import ProductController from '../controllers/productsController';
import { validateProductName, validateProductAmount } from '../middlewares/productsValidations';

const routes = Router();
const productController = new ProductController();

routes.get('/', productController.getAllProducts);
routes.post('/', validateProductName, validateProductAmount, productController.createProduct);

export default routes;