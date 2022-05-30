import connection from './connection';
import ILogin from '../interfaces/login.interface';

export default class LoginModel {
  constructor(private db = connection) {}

  public async getUser(login: ILogin): Promise<ILogin[]> {
    const { username, password } = login;
    const [user] = await this.db.execute(
      'SELECT id, username, password FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    return user as ILogin[];
  }
}