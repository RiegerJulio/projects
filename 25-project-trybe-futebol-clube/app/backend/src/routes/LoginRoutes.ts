import * as express from 'express';
import LoginMiddleware from '../middlewares/LoginMiddleware';
import LoginController from '../controllers/LoginController';

export default class LoginRoutes {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.config();
  }

  private config(): void {
    this.router.post(
      '/',
      LoginMiddleware.emailValidate,

      LoginMiddleware.passwordValidate,

      LoginController.loginSuccess,
    );
    this.router.get(
      '/validate',
      LoginController.validateRole,
    );
  }
}
