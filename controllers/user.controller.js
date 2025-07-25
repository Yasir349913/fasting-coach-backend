const { User } = require('../models/index');
const { USER_ROLES, PAYMENT_STATUS } = require('../utils/enums');
const { BadRequest } = require('../errors');

const addUser = async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    throw new BadRequest('Please provide name and phone number');
  }

  const user = await User.findOne({ phone, role: USER_ROLES.USER });

  // Case 1: User exists and is already paid
  if (user && user.status === PAYMENT_STATUS.PAID) {
    throw new BadRequest('Phone number already exists');
  }

  // Case 2: User exists but payment is pending – update name and return
  if (user && user.status === PAYMENT_STATUS.PENDING) {
    user.name = name;
    await user.save();

    return res.status(200).json({
      message: 'User already exists with pending status.',
      user: {
        _id: user._id,
        name: user.name,
        phone: user.phone,
        status: user.status,
        is_subscribed: user.is_subscribed,
      },
    });
  }

  // Case 3: New user – create one
  const newUser = await User.create({
    name,
    phone,
    role: USER_ROLES.USER,
    status: PAYMENT_STATUS.PENDING,
    is_subscribed: false,
  });

  return res.status(201).json({
    message: 'User created successfully',
    user: {
      _id: newUser._id,
      name: newUser.name,
      phone: newUser.phone,
      status: newUser.status,
      is_subscribed: newUser.is_subscribed,
    },
  });
};

module.exports = { addUser };
