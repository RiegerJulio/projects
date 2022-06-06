// import { compareSync } from 'bcryptjs';
// import UsersModel from '../database/models/UsersModel';
// import IUser from '../interfaces/IUser';

// export default class CryptoHelper {
//   private static _user: IUser;

//   static async compare(email: string, password: string) {
//     const user = await UsersModel.findOne({ where: { email } });

//     const comparePassword = compareSync(password, user.password);

//     if (comparePassword) {
//       return this._user;
//     }
//     return null;
//     // throw new Error('Invalid password');
//   }
// }
