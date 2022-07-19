import App from './app';
import CarRouter from './routes/Router';

import { Car } from './interfaces/CarInterface';
import CarController from './controllers/CarController';

const server = new App();

const carController = new CarController();
const carRouter = new CarRouter<Car>();

carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
