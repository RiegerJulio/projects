import { Request, Response } from 'express';
import OrderService from '../services/orderService';

export default class OrderController {
  constructor(private orderService = new OrderService()) {}

  public getAllOrders = async (req: Request, res: Response) => {
    const allOrders = await this.orderService.getAllOrders();

    const allOrdersFormat = allOrders.map((order) => ({
      id: order.id,
      userId: order.userId,
      productsIds: [order.products],
    }));

    res.status(200).json(allOrdersFormat);
  };
}