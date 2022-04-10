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
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleService, 'getAll').resolves(sale);
    });
    after(() => {
      saleService.getAll.restore();
    });

    it('Requisition has status 200', async () => {
      await saleController.getAll(request, response);
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });   
  });

  describe('test the getById function', () => {
    before(() => {
      request.params = {id: 1};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(saleService, 'getById').resolves(sale);
    });
    after(() => {
      saleService.getById.restore();
    });

    it('Requisition has status 200', async () => {
      await saleController.getById(request, response);
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(sinon.match.array)).to.be.true;
    });
  });

  describe('test the getById function error', () => {
    before(() => {
      response.send = sinon.stub().returns();
      sinon.stub(saleService, 'getById').resolves(false);
    })
    after(() => {
      saleService.getById.restore();
    });

    it('Requisition has status 400', async () => {
      await saleController.getById(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    });
  });
});
