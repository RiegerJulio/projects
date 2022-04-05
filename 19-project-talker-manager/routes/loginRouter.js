const router = require('express').Router();

const { randomToken, validateEmail, validatePassword } = require('../controllers/loginController');

router.post('/', validateEmail, validatePassword, (req, res, next) => {
  res.status(200).json({ token: `${randomToken()}` });
  next();
});

module.exports = router;