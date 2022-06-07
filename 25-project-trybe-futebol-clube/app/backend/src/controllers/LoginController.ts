import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
// import { compareSync } from 'bcryptjs';
// import TokenHelper from '../helpers/TokenHelper';
// import IUser from '../interfaces/IUser';

export default class LoginController {
  static async loginSuccess(req: Request, res: Response): Promise<Response | void> {
    try {
      const { email } = req.body;
      const user = await LoginService.loginSuccess(email);
      return res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  }

  static async validateRole(req: Request, res: Response): Promise<Response | void> {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const user = await LoginService.validateRole(token as string);
    return res.status(200).json(user.role);
  }
}
