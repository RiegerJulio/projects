const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/User');

const createUser = async (userInfo) => {
  const user = await User.create(userInfo);
  return user;
};

const findAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const findById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

const userLogin = async (userInfo) => {
  const { JWT_SECRET } = process.env;
  const jwtConfiguration = { expiresIn: '3h', algorithm: 'HS256' };
  const existance = await User
    .findOne({ where: { email: userInfo.email, password: userInfo.password } });
  if (!existance) {
    return { error: 'User not exists' };
  }
  const { id, email } = existance;
  const token = jsonWebToken.sign({ id, email }, JWT_SECRET, jwtConfiguration);
  return { token };
};

module.exports = {
  createUser,
  findAllUsers,
  findById,
  userLogin,
};
