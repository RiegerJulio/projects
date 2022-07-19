import sinon from 'sinon';
import { expect } from 'chai';
import CarService from '../../../services/CarService';
import { carMock, carMockReturn, invalidCarRequisitionMock } from '../mocks/carMock';

describe('Testing CarService layer', () => {

  const carService = new CarService();

  describe('testing create service', async () => {
    before(() => {
      sinon.stub(carService.model, 'create').resolves(carMockReturn);
    });
    
    after(() => {
      (carService.model.create as sinon.SinonStub).restore();
    });

    it('should create a new car', async () => {
      const result = await carService.create(carMock);
      expect(result).to.be.deep.equal(carMockReturn);
    });

    it('should return error when data is not valid', async () => {
      const result = await carService.create(invalidCarRequisitionMock);
      expect(result).haveOwnProperty('error');
      const result2 = await carService.create({} as any);
      expect(result2).haveOwnProperty('error');
    });
  });

  describe('testing read service', async () => {
    before(() => {
      sinon.stub(carService.model, 'read').resolves(carMockReturn as any);
    });

    after(() => {
      (carService.model.read as sinon.SinonStub).restore();
    });

    it('should read all cars', async () => {
      const result = await carService.read();
      expect(result).to.be.deep.equal(carMockReturn);
    });
  });

  describe('testing readOne service', async () => {
    before(() => {
      sinon.stub(carService.model, 'readOne').resolves(carMockReturn as any);
    });

    after(() => {
      (carService.model.readOne as sinon.SinonStub).restore();
    });

    it('should read one car', async () => {
      const result = await carService.readOne('123451234512345123451234');
      expect(result).to.be.deep.equal(carMockReturn);
    });
  });

  describe('testing update service', async () => {
    before(() => {
      sinon.stub(carService.model, 'update').resolves(carMockReturn as any);
    });

    after(() => {
      (carService.model.update as sinon.SinonStub).restore();
    });

    it('should update one car', async () => {
      const result = await carService.update('123451234512345123451234', carMock);
      expect(result).to.be.deep.equal(carMockReturn);
    });

    it('should return error when data is not valid', async () => {
      const result = await carService.update('123451234512345123451234', invalidCarRequisitionMock);
      expect(result).haveOwnProperty('error');
      const result2 = await carService.update('123451234512345123451234', {} as any);
      expect(result2).haveOwnProperty('error');
    });
  });

  describe('testing delete service', async () => {
    before(() => {
      sinon.stub(carService.model, 'delete').resolves(carMockReturn as any);
    });

    after(() => {
      (carService.model.delete as sinon.SinonStub).restore();
    });

    it('should delete one car', async () => {
      const result = await carService.delete('123451234512345123451234');
      expect(result).to.be.deep.equal(carMockReturn);
    });
  });
  
});
