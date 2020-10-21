const { Conflict } = require('../helpers/errors/conflictError');
const {userModel} = require('../modules/user.module');
const bcryptjs = require('bcryptjs')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') });




exports.signUp = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const existingUser = await userSchema.findOne({email});
    if(existingUser){
    throw new Conflict('User with such email already exists')
    }

    const passwordHash = await bcryptjs.hash(password, process.env.SALT_ROUNDS);
    const newUser = await userModel.create({
      email,
      passwordHash
    })

    console.log('req.body', req.body)
    res.status(201).send({
      id: newUser._id,
      email: newUser.email,
    })

  } catch (error) {
    next(error)
  }
};
