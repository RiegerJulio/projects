import { Request, Response } from 'express';
import ProductService from '../services/productService';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAllProducts = async (req: Request, res: Response) => {
    const products = await this.productService.getAllProducts();
    res.json(products);
  };
}

export default ProductController;