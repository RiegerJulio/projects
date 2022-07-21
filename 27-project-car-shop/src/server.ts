import App from './app';
import CarRouter from './routes/Router';

import { Car } from './interfaces/CarInterface';
import CarController from './controllers/CarController';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import MotorcycleController from './controllers/MotorcycleController';

const server = new App();

const carController = new CarController();
const carRouter = new CarRouter<Car>();
const motorcycleController = new MotorcycleController();
const motorcycleRouter = new CarRouter<Motorcycle>();

carRouter.addRoute(carController);
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

export default server;
