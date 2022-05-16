import { Router } from 'express';
import UserController from '../controllers/userController';
import { userNameValidations, classValidations,
  levelValidations, passwordValidations } from '../middlewares/userValidations';

const routes = Router();
const userController = new UserController();

routes.post(
  '/', 
  userNameValidations,
  classValidations,
  levelValidations,
  passwordValidations,
  userController.createUser,
);

export default routes;