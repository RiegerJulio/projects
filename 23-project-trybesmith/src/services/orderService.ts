import OrderModel from '../models/orderModel';
import IOrder from '../interfaces/order.interface';

export default class ProductService {
  private model = new OrderModel();

  public async getAllOrders(): Promise<IOrder[]> {
    const allOrders = await this.model.getAllOrders();
    return allOrders;
  }
}
