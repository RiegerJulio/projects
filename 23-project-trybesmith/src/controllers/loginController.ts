import { Request, Response } from 'express';
import LoginService from '../services/loginService';
import JWTToken from '../helpers/JWTToken';

const jwttoken = new JWTToken();

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public getUser = async (req: Request, res: Response) => {
    await this.loginService.getUser(req.body);
    const token = jwttoken.generateToken(req.body);
    res.status(200).json({ token });
  };
}