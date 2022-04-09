const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/saleModel');
const saleService = require('../../../services/saleService');

describe ('test the sale service layer', () => {
  describe ('test the getAll function', () => {
    before (() => {
      const sales = [
        {
          id: 1,
          name: 'sale 1',
          quantity: 10,
        },
        {
          id: 2,
          name: 'sale 2',
          quantity: 20,
        },
      ];
      sinon.stub(saleModel, 'getAll').returns(sales);
    });
    after (() => {
      saleModel.getAll.restore();
    });
    it ('should return all sales', async () => {
      const result = await saleService.getAll();
      expect (result).to.be.an('array');
      expect (result).to.have.lengthOf(2);
    });
  });

  describe ('test if the function getById returns a single sale', () => {
    before (() => {
      const sale =
        {
          id: 1,
          name: 'sale 1',
          quantity: 10,
        };
      sinon.stub(saleModel, 'getById').returns(sale);
    });
    after (() => {
      saleModel.getById.restore();
    });
    it ('should return a single sale', async () => {
      const result = await saleService.getById(1);
      expect (result).to.be.an('object');
    });
  });
});