import { Request, Response } from 'express';
import ProductService from '../services/productService';

class ProductController {
  constructor(private productService = new ProductService()) { }

  public getAllProducts = async (req: Request, res: Response) => {
    const products = await this.productService.getAllProducts();
    res.status(200).json(products);
  };

  public createProduct = async (req: Request, res: Response) => {
    const product = await this.productService.createProduct(req.body);
    res.status(201).json(product);
  };
}

export default ProductController;