const { User } = require('../models');
const { USER_ROLES, PAYMENT_STATUS } = require('../utils');
const { StatusCodes } = require('http-status-codes');
const { BadRequest, NotFound } = require('../errors');

// Add user (Create or Update if pending)
const addUser = async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    throw new BadRequest('Please provide name and phone number');
  }

  const existingUser = await User.findOne({ phone, role: USER_ROLES.USER });

  // Case 1: Already paid
  if (existingUser && existingUser.status === PAYMENT_STATUS.PAID) {
    throw new BadRequest('Phone number already exists');
  }

  // Case 2: Exists with pending status
  if (existingUser && existingUser.status === PAYMENT_STATUS.PENDING) {
    existingUser.name = name;
    await existingUser.save();

    return res.status(StatusCodes.OK).json({
      message: 'User already exists with pending status.',
      user: formatUserResponse(existingUser),
    });
  }

  // Case 3: New user
  const newUser = await User.create({
    name,
    phone,
    role: USER_ROLES.USER,
    status: PAYMENT_STATUS.PENDING,
    is_subscribed: false,
  });

  res.status(StatusCodes.CREATED).json({
    message: 'User created successfully',
    user: formatUserResponse(newUser),
  });
};

// Get all users with role "USER
const getUser = async (req, res) => {
  try {
    const { status, is_subscribed } = req.query;

    const query = { role: USER_ROLES.USER };

    if (status) query.status = status;
    if (is_subscribed !== undefined)
      query.is_subscribed = is_subscribed === 'true';

    const users = await User.find(query);

    res.status(StatusCodes.OK).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Server error while fetching users.',
    });
  }
};

// Update only 'name', 'status', and 'is_subscribed' fields of user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  const updateData = {};
  if (name) updateData.name = name;
  if (status) updateData.status = status;

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new NotFound(`No user found with ID: ${id}`);
  }

  res.status(StatusCodes.OK).json({
    message: 'User updated successfully',
    user: formatUserResponse(user),
  });
};

// Helper to format user response
const formatUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  phone: user.phone,
  status: user.status,
});

module.exports = { addUser, getUser, updateUser };
