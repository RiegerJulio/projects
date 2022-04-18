const userService = require('../services/userService');

// createUser,
// findAllUsers,
// findById,
// userLogin,

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await userService.userLogin(req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findById,
  userLogin,
};
