const mongoose = require("mongoose");
const { Schema } = mongoose;

const userScheme = new Schema({
  name: { type: String, required: true, default: "NoName" },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

userScheme.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;

async function findContactByIdAndUpdate(contactId, updateParams) {
  return this.findByIdAndUpdate(
    contactId,
    {
      $set: updateParams,
    },
    {
      new: true,
    }
  );
}

const UserModel = mongoose.model("Contact", userScheme);
module.exports = UserModel;