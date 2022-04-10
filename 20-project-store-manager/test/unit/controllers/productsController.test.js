const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productController =  require('../../../controllers/productController');

describe('test the product controller layer', () => {
  const request = {};
  const response = {};
  const product = [
    {
      id: 1,
      name: 'product 1',
      quantity: 10,
    },
  ];
  describe('test the getAll function', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves(product);
    })
    after(() => {
      productService.getAll.restore();
    });

    it('Requisition has status 200', async () => {
      await productController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });

  describe('test the getById function', () => {
    before(() => {
      request.params = {id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves(product);
    })
    after(() => {
      productService.getById.restore();
    });

    it('Requisition has status 200', async () => {
      await productController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    });
  });

  describe('test the getById function error', () => {
    before(() => {
      // request.params = {id: 1};
      // response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves(false);
    })
    after(() => {
      productService.getById.restore();
    });

    it('Requisition has status 404', async () => {
      await productController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });
  });
});