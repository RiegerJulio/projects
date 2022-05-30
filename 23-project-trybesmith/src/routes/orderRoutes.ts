import { Router } from 'express';
import OrderController from '../controllers/orderController';

const routes = Router();
const orderController = new OrderController();

routes.get('/', orderController.getAllOrders);

export default routes;