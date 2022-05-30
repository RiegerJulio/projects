import LoginModel from '../models/loginModel';
import ILogin from '../interfaces/login.interface';

export default class LoginService {
  private model = new LoginModel();

  public async getUser(login: ILogin): Promise<ILogin> {
    const user = await this.model.getUser(login);
    return user[0];
  }
}
