const mongoose = require("mongoose");
const {Schema} = mongoose;

const contactsSchema = new Schema({
  name: { type: String, required: true, default: "NoName" },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },

});


const contactSchema = mongoose.model("Contact", contactsSchema);
module.exports = contactSchema;