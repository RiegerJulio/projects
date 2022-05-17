import connection from './connection';
import IOrder from '../interfaces/order.interface';

export default class OrderModel {
  constructor(private db = connection) {}

  public async getAllOrders(): Promise<IOrder[]> {
    const [orders] = await this.db.execute(
      `SELECT ord.id, ord.userId, prod.id AS products FROM Trybesmith.Orders AS ord
      INNER JOIN Trybesmit.Products AS prod ON prod.orderId = ord.id`,
    );
    return orders as IOrder[];
  }
}