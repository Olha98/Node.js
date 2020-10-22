const { Router } = require('express');
const express = require('express');
const { authorize } = require('../helpers/authorize');
const { getCurrentUser } = require('./users.controller');
const userRouter = express.Router();

userRouter.get('/current', authorize, getCurrentUser);

module.exports = userRouter;
