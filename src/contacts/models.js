const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactScheme = new Schema({
  name: { type: String, required: true, default: "NoName" },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

contactScheme.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;

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

const ContactModel = mongoose.model("Contact", contactScheme);
module.exports = ContactModel;