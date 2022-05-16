import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import IUser from '../interfaces/user.interface';

export default class UserModel {
  constructor(private db = connection) {}

  public async createUser(user: IUser): Promise<IUser> {
    const { username, classe, level, password } = user;
    const [result] = await this.db.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    return {
      id: result.insertId,
      username,
      classe,
      level,
      password,
    };
  }
}