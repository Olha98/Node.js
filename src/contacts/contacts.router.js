const { Router } = require("express");
const ContactsController = require("./contacts.controller");
const { validate } = require("../helpers/validate");
const Joi = require("joi");


const contactsRouter = Router();
const {
  getContacts,
  getContactsById,
  addContacts,
  removeContact,
  updateContact
} = ContactsController;

const addContactsSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required()
});

const updatedContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
});

contactsRouter.get("/", getContacts);
contactsRouter.get("/:contactId", getContactsById);

contactsRouter.post("/", validate(addContactsSchema), addContacts);

contactsRouter.delete("/:contactId", removeContact);

contactsRouter.patch("/:contactId", validate(updatedContactSchema), updateContact);

module.exports = contactsRouter;