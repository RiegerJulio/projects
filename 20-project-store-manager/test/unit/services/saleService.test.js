const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');
const { object } = require('joi');

describe ('test the sale service layer', () => {
  describe ('test the getAll function', () => {
    before (() => {
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
      sinon.stub(saleModel, 'getAll').returns(sales);
    });
    after (() => {
      saleModel.getAll.restore();
    });
    it ('should return all sales', async () => {
      const result = await saleService.getAll();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(2);
    });
  });

  describe ('test if the function getById returns a single sale', () => {
    before (() => {
      const sale = [
      {
        date: "2022-04-09T18:06:01.000Z",
        productId: 1,
        quantity: 5,
      }
    ];
      sinon.stub(saleModel, 'getById').returns(sale);
    });
    after (() => {
      saleModel.getById.restore();
    });

    it ('should return a single sale', async () => {
      const result = await saleService.getById();
      expect (result).to.be.an('array');
    });
  });

  // describe('test the getById function null', () => {
  //   before(() => {
  //     sinon.stub(saleModel, 'getById').resolves(null);
  //   });
  //   after(() => {
  //     saleModel.getById.restore();
  //   });
  //   it('should return null in sales', async () => {
  //     const result = await saleService.getById();
  //     expect(result).to.be.null;
  //   });
  // });
});