const jwt = require('jsonwebtoken');
const userModel = require('../users/user.module');
const {Unauthorized} = require('./errors/unauthorizedError');


exports.authorize = async(req, res, next)=>{
try {
  const {token} = req.cookies;
  const payload = await jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(payload.userId);
  if(!user){
    throw new Unauthorized();
  }

  req.user = user;
  next();

} catch (error) {
  next(new Unauthorized('Not authorized'))
}
}