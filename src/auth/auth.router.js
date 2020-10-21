const { Router } = require('express');
const {validate} = require('../helpers/validate');
const {signUpSchema} = require('./auth.schemas');
const {signUp} = require('./auth.controller')

const express = require("express");
const authRouter = express.Router();


authRouter.post('/register', validate(signUpSchema), signUp)


module.exports = authRouter;
