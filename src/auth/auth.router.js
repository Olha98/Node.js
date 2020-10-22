const { Router } = require('express');
const {validate} = require('../helpers/validate');
const {signUpSchema, signInSchema} = require('./auth.schemas');
const {signUp, signIn} = require('./auth.controller')

const express = require("express");
const authRouter = express.Router();


authRouter.post('/register', validate(signUpSchema), signUp);
authRouter.post('/login', validate(signInSchema), signIn)



module.exports = authRouter;
