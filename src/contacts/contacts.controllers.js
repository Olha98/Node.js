const ContactModel = require("./models");
const mongoose = require("mongoose");

exports.getContacts = async (req, res, next) => {
  const contactsList = await ContactModel.find();

  res.status(200).json({
    status: "success",
    data: { contactsList },
  });
};

exports.getContactsById = async (req, res, next) => {
  const { id } = req.params;
  let contact = "";
  if (mongoose.Types.ObjectId.isValid(id)) {
    contact = await ContactModel.findById(id);
    if (!contact) {
      return next(new AppError(`Contact not found`, 404));
    }

    return res.status(200).json({
      status: "success",
      contact,
    });
  }
  return res.status(404).json({
    status: "fail",
    message: "wrong contact id",
  });
};

exports.addContacts = async (req, res, next) => {
  const newContact = await ContactModel.create(req.body);

  res.status(201).json({
    status: "success",
    contact: newContact,
  });
};

exports.changeContact = async (req, res, next) => {
  const { id } = req.params;
  let contact = "";
  if (mongoose.Types.ObjectId.isValid(id)) {
    contact = await ContactModel.findContactByIdAndUpdate(id, req.body);
    if (!contact) {
      return next(new AppError(`Contact not found`, 404));
    }

    return res.status(200).json({
      status: "success",
      contact: contact,
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "wrong contact id",
  });
};

exports.deleteContact = async (req, res, next) => {
  const { id } = req.params;
  let contact = "";
  if (mongoose.Types.ObjectId.isValid(id)) {
    contact = await ContactModel.findByIdAndDelete(id);
    if (!contact) {
      return next(new AppError(`Contact not found`, 404));
    }
    return res.sendStatus(204);
  }
  return res.status(404).json({
    status: "fail",
    message: "wrong contact id",
  });
};