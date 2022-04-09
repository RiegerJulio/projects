const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');

describe('test the product service layer', () => {
  describe('test the getAll function', () => {
    before(() => {
      const products = [
        {
          id: 1,
          name: 'product 1',
          quantity: 10,
        },
        {
          id: 2,
          name: 'product 2',
          quantity: 20,
        },
      ];
      sinon.stub(productModel, 'getAll').resolves(products);
    });
    after(() => {
      productModel.getAll.restore();
    });
    it('should return all products', async () => {
      const result = await productService.getAll();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  });

  describe('test if the function getById returns a single product', () => {
    before(() => {
      const product =
        {
          id: 1,
          name: 'product 1',
          quantity: 10,
        };
      sinon.stub(productModel, 'getById').resolves(product);
    });
    after(() => {
      productModel.getById.restore();
    });
    it('should return a single product', async () => {
      const result = await productService.getById(1);
      expect(result).to.be.an('object');
    });
  });
});