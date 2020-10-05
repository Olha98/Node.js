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
  ContactsController.validateCreateContact.bind(ContactsController),
  ContactsController.createContact.bind(ContactsController)
);

contactRouter.patch(
  "/:contactId",
  ContactsController.validateCreateContact.bind(ContactsController),
  ContactsController.addContact.bind(ContactsController)
);
contactRouter.delete(
  "/:contactId",
  ContactsController.removeContact.bind(ContactsController)
);

module.exports = contactRouter;
