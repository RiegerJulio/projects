import { Router } from 'express';
import LoginController from '../controllers/loginController';
import { userNameValidations, passwordValidations } from '../middlewares/userValidations';

const routes = Router();
const loginController = new LoginController();

routes.post(
  '/',
  userNameValidations,
  passwordValidations,
  loginController.getUser,
);

export default routes;