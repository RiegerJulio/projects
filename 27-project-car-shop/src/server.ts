import App from './app';
import teste from './routes/teste';

// import exampleController from './controllers/controller-example';

// import { example } from './interfaces/ExampleInterface';

const server = new App();

// const exampleController = new exampleController();

// const exampleRouter = new CustomRouter<Car>();
// exampleRouter.addRoute(exampleController);

server.addRouter(teste);

export default server;
