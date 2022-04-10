const sinon = require('sinon');
const { expect } = require('chai');
const saleService = require('../../../services/saleService');
const saleController =  require('../../../controllers/saleController');

describe('test the sale controller layer', () => {
  const request = {};
  const response = {};
  const sale = [
    {
      sale_id: 1,
      date: "2022-04-09T18:06:01.000Z",
      productId: 1,
      quantity: 5,
    }
  ];
  describe('test the getAll function', () => {
    
});
