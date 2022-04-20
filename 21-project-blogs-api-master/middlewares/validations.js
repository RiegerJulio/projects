const jsonWebToken = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv');

const validateName = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const mailRegex = /\S+@\S+\.\S+/;
  const regexTest = mailRegex.test(email);

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!regexTest) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'User already registered' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
   }
  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const checkEmailCredential = async (req, res, next) => {
  const { email } = req.body;
  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  } if (email.length < 1) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }
  next();
};

const checkPasswordCredential = async (req, res, next) => {
  const { password } = req.body;
  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  } if (password.length < 1) {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

const tokenValidations = async (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jsonWebToken.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const categoryValidations = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (name === undefined) {
      return res.status(400).json({ message: '"name" is required' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const postValidations = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) {
      return res.status(400).json({ message: '"title" is required' });
    }
    if (!content) {
      return res.status(400).json({ message: '"content" is required' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

const postCategoryValidations = async (req, res, next) => {
  try {
    const { categoryIds } = req.body;
    if (!categoryIds) {
      return res.status(400).json({ message: '"categoryIds" is required' });
    }
    // if (categoryIds) {
    //   return res.status(400).json({ message: '"categoryIds" not found' });
    // }

    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

// const editValidations = async (req, res, next) => {
//   try {
//     const { title, content, categoryId } = req.body;
//     if (!title) {
//       return res.status(400).json({ message: '"title" is required' });
//     }
//     if (!content) {
//       return res.status(400).json({ message: '"content" is required' });
//     }
//     if (categoryId) {
//       return res.status(400).json({ message: 'Categories cannot be edited' });
//     }
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: error.message });
//   }
// };

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  checkEmailCredential,
  checkPasswordCredential,
  tokenValidations,
  categoryValidations,
  postValidations,
  postCategoryValidations,
  // editValidations,
};
