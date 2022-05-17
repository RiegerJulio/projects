import jwtToken, { SignOptions } from 'jsonwebtoken';
import { ITokenInfos } from '../interfaces/jwt.interface';

export default class JWTToken {
  private SECRET = 'SEGREDAOHEINBICHO';

  private jwtConfig: SignOptions = {
    expiresIn: '10h',
    algorithm: 'HS256',
  };
  
  public generateToken = (tokenInfos: ITokenInfos): string => {
    const token = jwtToken.sign(tokenInfos, this.SECRET, this.jwtConfig);
    return token;
  };
}