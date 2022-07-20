import sinon from 'sinon';
import { expect } from 'chai';
import CarController from '../../../controllers/CarController';
import { carMock, carMockReturn, arrayOfCarsMock, zodErrorMock } from '../mocks/carMock';
import { RequestWithBody } from '../../../controllers/MongoController';
import { Car } from '../../../interfaces/CarInterface';
import { Request, Response } from 'express';
import { ZodAny } from 'zod';

describe('Testing CarController layer', () => {
  const carController = new CarController();
  let req = {} as RequestWithBody<Car>;
  let res = {} as Response;

  describe(' Testing post /cars', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(carController.service, 'create').resolves(carMockReturn);
    });

    after(() => {
      sinon.restore();
    });

    it('should return 201 status code', async () => {
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockReturn)).to.be.true;
    });
  });

  describe(' Testing post /cars errors', () => {
    describe('400 for wrong data', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'create').resolves(zodErrorMock as any);
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('should return 400 status code', async () => {
        await carController.create(req, res);
        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      });
    });
    
    describe('400 for no data', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'create').resolves(null);
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('should return 400 status code', async () => {
        await carController.create(req, res);
        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      });
    });

    describe('500', () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'create').rejects();
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('should return 500 status code', async () => {
        await carController.create(req, res);
        expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      });
    })
  });


  describe(' Testing get /cars', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(carController.service, 'read').resolves(arrayOfCarsMock);
    });

    after(() => {
      sinon.restore();
    });

    it('should return 200 status code', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(arrayOfCarsMock)).to.be.true;
    });
  });

  describe('Testing get /cars errors', () => {
    before(() => {
      sinon.stub(carController.service, 'read').rejects();
    });

    after(() => {
      sinon.restore();
    });

    it('should return 500 status code', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith({ error: 'Internal server error' })).to.be.true;
    });
  });

  describe(' Testing get /cars/:id', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(carController.service, 'readOne').resolves(carMockReturn);
    });

    after(() => {
      sinon.restore();
    });

    it('should return 200 status code', async () => {
      req = { params: { id: '123451234512345123451234' } } as Request<{id: string}>;
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockReturn)).to.be.true;
    });
  });

  describe('Testing get /cars/:id errors', () => {
    describe('404', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'readOne').resolves();
      });
  
      after(() => {
        sinon.restore();
      });
      it ('should return 404 status code', async () => {
        req = { params: { id: '123451234512345123451232' } } as Request<{id: string}>;
        await carController.readOne(req, res);
        expect((res.status as sinon.SinonStub).calledWith(404)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
      })
    });
    describe('500', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'readOne').rejects();
      });
     after(() => {
        sinon.restore();
      });
      it ('should return 500 status code', async () => {
        await carController.readOne(req, res);
        expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Internal server error' })).to.be.true;
      })
    });

    describe('400', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'readOne').resolves(carMockReturn);
      });
  
      after(() => {
        sinon.restore();
      });
      it ('should return 400 status code', async () => {
        req = { params: { id: '12345123451234512345123' }, body: carMock } as Request<{id: string}>;
        await carController.readOne(req, res);
        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      })
    });
  });

  describe(' Testing put /cars/:id', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(carController.service, 'update').resolves(carMockReturn);
    });
    after(() => {
      sinon.restore();
    });
    it('should return 200 status code', async () => {
      req = { params: { id: '123451234512345123451234' }, body: carMock } as Request<{id: string}>;
      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockReturn)).to.be.true;
    });
  });

  describe('Testing put /cars/:id errors', () => {
    describe('404', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'update').resolves();
      });
  
      after(() => {
        sinon.restore();
      });
      it ('should return 404 status code', async () => {
        req = { params: { id: '123451234512345123451232' } } as Request<{id: string}>;
        await carController.update(req, res);
        expect((res.status as sinon.SinonStub).calledWith(404)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
      })
    });

    describe('500', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'update').rejects();
      });
     after(() => {
        sinon.restore();
      });
      it ('should return 500 status code', async () => {
        await carController.update(req, res);
        expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Internal server error' })).to.be.true;
      })
    });

    describe('400 for error', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'update').resolves(zodErrorMock as any);
      });
  
      after(() => {
        sinon.restore();
      });
      it ('should return 400 status code', async () => {
        req = { params: { id: '123451234512345123451234' }, body: carMock } as Request<{id: string}>;
        await carController.update(req, res);
        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      })
    });

    describe('400 for invalid data', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'update').resolves(carMockReturn);
      });
  
      after(() => {
        sinon.restore();
      });
      it ('should return 400 status code', async () => {
        req = { params: { id: '1234512345123451234512' }, body: carMock } as Request<{id: string}>;
        await carController.update(req, res);
        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Id must have 24 hexadecimal characters' })).to.be.true;
      });
    });
  });

  describe(' Testing delete /cars/:id', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      sinon.stub(carController.service, 'delete').resolves(carMockReturn);
    });
    after(() => {
      sinon.restore();
    });
    it('should return 204 status code', async () => {
      req = { params: { id: '123451234512345123451234' } } as Request<{id: string}>;
      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockReturn)).to.be.true;
    });
  });

  describe('Testing delete /cars/:id errors', () => {
    describe('404', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'delete').resolves();
      });
  
      after(() => {
        sinon.restore();
      });
      it ('should return 404 status code', async () => {
        req = { params: { id: '123451234512345123451232' } } as Request<{id: string}>;
        await carController.delete(req, res);
        expect((res.status as sinon.SinonStub).calledWith(404)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
      })
    });

    describe('500', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'delete').rejects();
      });
     after(() => {
        sinon.restore();
      });
      it ('should return 500 status code', async () => {
        await carController.delete(req, res);
        expect((res.status as sinon.SinonStub).calledWith(500)).to.be.true;
        expect((res.json as sinon.SinonStub).calledWith({ error: 'Internal server error' })).to.be.true;
      })
    });

    describe('400', async () => {
      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        sinon.stub(carController.service, 'delete').resolves(carMockReturn);
      });
  
      after(() => {
        sinon.restore();
      });
      it ('should return 400 status code', async () => {
        req = { params: { id: '12345123451234512345123' }, body: carMock } as Request<{id: string}>;
        await carController.delete(req, res);
        expect((res.status as sinon.SinonStub).calledWith(400)).to.be.true;
      })
    });
  });

  describe('Testing if the route is working', () => {
    it('should check if route is working properly', async () => {
      let route = carController.route;
      expect(route).to.be.equal('/cars');
    });
  });
});