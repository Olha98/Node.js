const express = require('express');
const ContactsController = require('./contacts.controller')
const contactRouter = express.Router()

contactRouter.get('/',  ContactsController.getContacts)


module.exports = contactRouter;