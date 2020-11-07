const mongoose = require("mongoose");

const { Schema } = mongoose;

const userScheme = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarURL: { type: String, required: true },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: { type: String },
  verificationToken: { type: String, required: false },
});

const UserModel = mongoose.model("User", userScheme);

module.exports = UserModel;