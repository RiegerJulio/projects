import { Request, Response } from 'express';
import UserService from '../services/userService';
import JWTToken from '../helpers/JWTToken';

const jwttoken = new JWTToken();

class UserController {
  constructor(private userService = new UserService()) { }

  public createUser = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    const token = jwttoken.generateToken(user);
    res.status(201).json({ token });
  };
}

export default UserController;