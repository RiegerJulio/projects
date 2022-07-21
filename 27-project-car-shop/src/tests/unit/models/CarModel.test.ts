import sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/CarModel';
import { carMock, carMockReturn, arrayOfCarsMock } from '../mocks/carMock';

describe('Testing CarModel layer', () => {

  const carModel = new CarModel();

  describe('testing create model', async () => {

    before(() => {
      sinon.stub(carModel.model, 'create').resolves(carMockReturn);
    });
  
    after(() => {
      (carModel.model.create as sinon.SinonStub).restore();
    });

    it('should create a new car', async () => {
      const result = await carModel.create(carMock);
      expect(result).to.be.deep.equal(carMockReturn);
    });
  });

  describe('testing read model', async () => {
    before(() => {
      return sinon.stub(carModel.model, 'find').resolves(arrayOfCarsMock as any);
    });

    after(() => {
      (carModel.model.find as sinon.SinonStub).restore();
    });

    it('should read all cars', async () => {
      const result = await carModel.read();
      expect(result).to.be.deep.equal(arrayOfCarsMock);
    });
  });

  describe('testing readOne model', async () => {
    before(() => {
      sinon.stub(carModel.model, 'findOne').resolves(carMockReturn as any);
    });

    after(() => {
      (carModel.model.findOne as sinon.SinonStub).restore();
    });

    it('should read one car', async () => {
      const result = await carModel.readOne('123451234512345123451234');
      expect(result).to.be.deep.equal(carMockReturn);
    });
  });

  describe('testing update model', async () => {
    before(() => {
      sinon.stub(carModel.model, 'findByIdAndUpdate').resolves(carMockReturn as any);
    });
  
    after(() => {
      (carModel.model.findByIdAndUpdate as sinon.SinonStub).restore();
    });
  
    it('should update a car', async () => {
      const result = await carModel.update('123451234512345123451234', carMock);
      expect(result).to.be.deep.equal(carMockReturn);
    });
  });

  describe('testing delete model', async () => {
    before(() => {
      sinon.stub(carModel.model, 'findByIdAndDelete').resolves(carMockReturn as any);
    });
  
    after(() => {
      (carModel.model.findByIdAndDelete as sinon.SinonStub).restore();
    });
  
    it('should delete a car', async () => {
      const result = await carModel.delete('123451234512345123451234');
      expect(result).to.be.deep.equal(carMockReturn);
    });
  });
});