import UsersModel from '../database/models/UsersModel';
import IUser from '../interfaces/IUser';
import LoginServiceToken from '../helpers/TokenHelper';

export default class LoginService {
  public static async getLoginInfo(email: string): Promise<IUser> {
    const user = await UsersModel.findOne({ where: { email } });
    return user as IUser;
  }

  public static async loginSuccess(email: string) {
    const user = await this.getLoginInfo(email);
    const formatPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const token = await LoginServiceToken.generateToken(formatPayload);

    return {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      token,
    };
  }

  public static async validateRole(tokenAuthorization: string) {
    const token = tokenAuthorization;
    const user = await LoginServiceToken.decodeToken(token);
    return user as IUser;
  }
}
