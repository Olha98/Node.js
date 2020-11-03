const userModel = require('../users/user.module');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../src/.env') });

const { Conflict } = require('../helpers/errors/conflictError');
const { NotFound } = require('../helpers/errors/notFoundError');
const { ForBidden } = require('../helpers/errors/forbiddenError');
const { Unauthorized } = require('../helpers/errors/unauthorizedError');

exports.signUp = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      throw new Conflict('Email in use');
    }

    const passwordHash = await bcryptjs.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );

    const newUser = await userModel.create({
      email,
      password: passwordHash,
      subscription,
    });

    return res.status(201).send({
      email: newUser.email,
      subscription: newUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new NotFound('Email or password is wrong'); //404&
    }

    // console.log(password, 'password');
    // console.log(user.password, 'passwordHash');

    // console.log(user, 'user');
    const isCorrectPassword = await bcryptjs.compare(password, user.password);

    if (!isCorrectPassword) {
      throw new ForBidden('Provided password is wrong');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.cookie('token', token, { httpOnly: true });

    return res.status(200).send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const findUserById = await userModel.findOne({ _id });

    if (!findUserById) {
      throw new Unauthorized('Not authorized');
    }

    console.log(req.body, 'req.body');
    console.log(findUserById, 'findUserById');

    return res.status(200).send({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
