const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productController =  require('../../../controllers/productController');

describe ('test the product controller layer', () => {
  const request = {};
  const response = {};
  describe ('test the getAll function', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves();
    })
    after(() => {
      productService.getAll.restore();
    });

    it('Requisition has status 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});