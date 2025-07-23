const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, Unauthenticated } = require('../errors');
const { USER_ROLES } = require('../utils/enums');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequest('Please provide email and password');
  }

  const user = await User.findOne({ email, role: USER_ROLES.ADMIN });
  if (!user) {
    throw new Unauthenticated('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Unauthenticated('Invalid Credentials');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, accessToken: token });
};

module.exports = { login };
