import ProductModel from '../models/productModel';
import IProduct from '../interfaces/product.interface';

export default class ProductService {
  private model = new ProductModel();

  public async getAllProducts(): Promise<IProduct[]> {
    const allProducts = await this.model.getAllProducts();
    return allProducts;
  }
}