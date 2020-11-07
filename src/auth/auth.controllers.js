const bcrypt = require("bcrypt");
const UserModel = require("./user.model");
const AppError = require("../helpers/AppError");
const jwt = require("jsonwebtoken");
const { avatarCreator } = require("../helpers/avatarCreate");

const { v4: uuidv4 } = require("uuid");
const { emailVerificationSender } = require("../services/emailService");
const { token } = require("morgan");
const path = require("path")
require('dotenv').config({ path: path.join(__dirname, './.env') });

exports.createNewUser = async (req, res, next) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const existUser = await UserModel.findOne({ email });

  if (existUser) {
    return next(new AppError("User with such email is exist", 409));
  }

  const avatarName = await avatarCreator();
  const avatarPath = `http://localhost:${process.env.PORT}/images/${avatarName}`;
  const verificationToken = uuidv4();

  const newUser = await UserModel.create({
    email,
    password: passwordHash,
    avatarURL: avatarPath,
    verificationToken,
  });

  await emailVerificationSender(email, verificationToken);

  res.status(201).json({
    status: "success",
    createdUser: {
      email: newUser.email,
      id: newUser._id,
    },
  });
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const existUser = await UserModel.findOne({ email });

  if (!existUser) {
    return next(new AppError("Email or password is wrong", 401));
  }
  const validPassword = await bcrypt.compare(password, existUser.password);
  if (!validPassword) {
    return next(new AppError("Email or password is wrong", 401));
  }

  const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET, {
    expiresIn: 2 * 24 * 60 * 60,
  });

  res.status(200).json({
    status: "success",
    loginUser: {
      token: token,
      email: existUser.email,
      id: existUser._id,
      subscription: existUser.subscription,
    },
  });
};

exports.logout = async (req, res, next) => {
  const loggedUser = req.user;

  await UserModel.findByIdAndUpdate(loggedUser._id, { token: "" });
  req.user = null;
  res.status(204).end();
};