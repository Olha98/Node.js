const express = require("express");
const ContactsController = require("./contacts.controller");
const contactRouter = express.Router();

contactRouter.get("/", ContactsController.listContacts);

contactRouter.get(
  "/:contactId",
  ContactsController.getById.bind(ContactsController)
);

contactRouter.post(
  "/",
  ContactsController.validateAddContact.bind(ContactsController),
  ContactsController.addContact.bind(ContactsController)
);

contactRouter.patch(
  "/:contactId",
  ContactsController.validateUpdateContact.bind(ContactsController),
  ContactsController.updateContact.bind(ContactsController)
);
contactRouter.delete(
  "/:contactId",
  ContactsController.removeContact.bind(ContactsController)
);

module.exports = contactRouter;
