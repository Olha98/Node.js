const mongoose = require('mongoose');

const { Schema } = mongoose;

const usersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subscription: {
    type: String,
    enum: ['free', 'pro', 'premium'],
    default: 'free',
  },
  // token: { type: String },
});

const userModel = mongoose.model('User', usersSchema);
module.exports = userModel;


// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
//     lowercase: true,
//     required: [true, 'Please, provide your email'],
//   },
//   password: {
//     type: String,
//     required: [true, 'Please, provide your password'],
//     minlength: 8,
//   },
//   subscription:{
//     type: String,
//     required: [true, 'Please, write your subscription'],
//     enum: ["free", "pro", "premium"],
//     default: "free"
//   },

//   token:{
//     type: String,
//     required: false,
//   }

// });

// const UserModel = mongoose.model("User", userSchema)
// model.exports = UserModel;

