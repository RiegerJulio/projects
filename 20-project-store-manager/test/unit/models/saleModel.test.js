const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const saleModel = require('../../../models/saleModel');

describe('test the sale model layer ', () => {
  describe('test if the function getAll returns all the sales', () =>{
    before(() => {
      const sales = [
        {
          sale_id: 1,
          date: "2022-04-09T18:06:01.000Z",
          productId: 1,
          quantity: 10,
        },
        {
          sale_id: 2,
          date: "2022-04-09T18:06:01.000Z",
          productId: 2,
          quantity: 10,
        },
      ];
      sinon.stub(connection, 'execute').resolves([sales]);
    });
    after(() => {
      connection.execute.restore();
    });  
    it('should return all the sales', async () => {
      const result = await saleModel.getAll();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.have.property('sale_id');
      expect(result[0]).to.have.property('date');
      expect(result[0]).to.have.property('productId');
      expect(result[0]).to.have.property('quantity');
    });
  });

  describe('test if the function getById returns the all the sales with the given id', () => {
    before(() => {
      const sales = [
        {
          date: "2022-04-09T18:06:01.000Z",
          productId: 1,
          quantity: 5,
        },
        {
          date: "2022-04-09T18:06:01.000Z",
          productId: 2,
          quantity: 10,
        }
      ]
      sinon.stub(connection, 'execute').resolves([sales]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('should return the sale with the given id', async () => {
      const result = await saleModel.getById(1);
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  });
})