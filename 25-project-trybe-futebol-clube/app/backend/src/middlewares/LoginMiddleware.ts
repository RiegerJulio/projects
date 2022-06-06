import { Request, Response, NextFunction } from 'express';
import * as bcryptjs from 'bcryptjs';
// import IUser from '../interfaces/IUser';
// import CryptoHelper from '../helpers/CryptoHelper';
import UsersModel from '../database/models/UsersModel';

export default class LoginMiddleware {
  static emailValidate(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body;
    const emailRegex = /\S+@\S+\.\S+/;
    if (email === '' || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  }

  static async passwordValidate(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (password === '' || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const user = await UsersModel.findOne({ where: { email } });
    if (user) {
      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    }
    next();
  }
}
