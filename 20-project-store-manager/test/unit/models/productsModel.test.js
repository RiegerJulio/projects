const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productModel = require('../../../models/productModel');

describe('Test the products model layer', () => {
  describe('test if the function getAll returns all the products', () => {
    before(() => {
      const products = [
        {
          id: 1,
          name: 'product1',
          quantity: 10,
        },
        {
          id: 2,
          name: 'product2',
          quantity: 20,
        },
      ];
      sinon.stub(connection, 'execute').resolves([products]);
    });
    after(() => {
      connection.execute.restore();
    });  
    it('should return all the products', async () => {
      const result = await productModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.have.property('id');
      expect(result[0]).to.have.property('name');
      expect(result[0]).to.have.property('quantity');
    });
  });

  describe('test if the function getById returns a single product', () => {
    before(() => {
      const product = [
        {
          id: 1,
          name: 'product1',
          quantity: 10,
        },
    ];
      sinon.stub(connection, 'execute').resolves([product]);
    });
    after(() => {
      connection.execute.restore();
    });  
    it('should return a single product', async () => {
      const result = await productModel.getById(1);
      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result).to.have.property('name');
      expect(result).to.have.property('quantity');
    });
  });
});

// describe('Insert a new product in the DB', () => {
//   const mockproduct = {
//     id: 1,
//     name: 'Example Product',
//     quantity: 10,
//   };
//   before(async () => {
//     const execute = [{ insertId: 1 }];

//     sinon.stub(connection, 'execute').resolves(execute);
//   });
//   after(async () => {
//     connection.execute.restore();
//   });

//   it('when the product is inserted successfully, it returns an object', async () => {
//     const response = await productModel.create(mockproduct);

//     expect(response).to.be.a('object');
//   });

//   it('the object returned has the "id" of the new product inserted', async () => {
//     const response = await productModel.create(mockproduct);

//     expect(response).to.have.a.property('id');
//   });

// });
