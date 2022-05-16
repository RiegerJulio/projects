import { Router } from 'express';
import ProductController from '../controllers/productsController';

const routes = Router();
const productController = new ProductController();

routes.get('/', productController.getAllProducts);

export default routes;