import UserModel from '../models/userModel';
import IUser from '../interfaces/user.interface';

export default class UserService {
  private model = new UserModel();
  
  public async createUser(user: IUser): Promise<IUser> {
    const createdUser = await this.model.createUser(user);
    return createdUser;
  }
}