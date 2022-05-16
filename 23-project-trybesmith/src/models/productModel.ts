import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import IProduct from '../interfaces/product.interface';

export default class ProductModel {
  constructor(private db = connection) {}

  public async getAllProducts(): Promise<IProduct[]> {
    const [products] = await this.db.execute(
      'SELECT * FROM Trybesmith.Products',
    );
    return products as IProduct[];
  }

  public async createProduct(product: IProduct): Promise<IProduct> {
    const { name, amount } = product;
    const [result] = await this.db.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    return {
      id: result.insertId,
      name,
      amount,
    };
  }
}