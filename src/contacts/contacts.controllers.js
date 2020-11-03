const AppError = require("../helpers/errApp");
const contacts = require("./models");

exports.getContacts = async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.status(200).json({
    status: "success",
    data: { contactsList },
  });
};

exports.getContactsById = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return next(new AppError(`Contact not found`, 404));
  }

  return res.status(200).json({
    status: "success",
    contact,
  });
};

exports.addContacts = async (req, res, next) => {
  const newContact = await contacts.addContact(req.body);

  res.status(201).json({
    status: "success",
    contact: newContact,
  });
};

exports.changeContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return next(new AppError(`Contact not found`, 404));
  }

  const changedContact = await contacts.updateContact(id, req.body);

  return res.status(200).json({
    status: "success",
    contact: changedContact,
  });
};

exports.deleteContact = async (req, res, next) => {
  const { id } = req.params;

  const contact = await contacts.getContactById(id);

  if (!contact) {
    return next(new AppError(`Contact not found`, 404));
  }
  const deletedContact = await contacts.removeContact(id);
  return res.sendStatus(204);
};