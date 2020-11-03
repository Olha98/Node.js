const { Router } = require('express');
const {validate} = require('../helpers/validate');
const {signUpSchema, signInSchema, logoutSchema} = require('./auth.schemas');
const {signUp, signIn, logout} = require('./auth.controller')

const express = require("express");
const authRouter = express.Router();


authRouter.post('/register', validate(signUpSchema), signUp);
authRouter.post('/login', validate(signInSchema), signIn);
authRouter.delete('/logout', validate(logoutSchema), logout)



module.exports = authRouter;
