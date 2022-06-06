import { SignOptions, sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

export default class LoginServiceToken {
  private static _token: string;
  private static _secret: string = readFileSync('jwt.evaluation.key', 'utf8');
  private static _jwtConfig: SignOptions = {
    expiresIn: '10h',
    algorithm: 'HS256',
  };

  static async generateToken(user: object): Promise<string> {
    this._token = sign(user, this._secret, this._jwtConfig);

    return this._token;
  }

  static async decodeToken(tkn: string) {
    const verifyToken = verify(tkn, this._secret, this._jwtConfig);
    return verifyToken;
  }
}
