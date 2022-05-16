import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private userService = new UserService()) { }

  public createUser = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json(user);
  };
}

export default UserController;