const Joi = require("joi");

const contacts = [
  {
    id: 1,
    name: "Gichard",
    email: "gfghf@gmail.com",
    password: "123456gg",
  },
];

class ContactController {


  listContacts(req, res, next) {
    return res.json(contacts);
  }


  createContact(req, res, next) {
    const newContact = {
      ...req.body,
      id: contacts.length + 1,
    };

    contacts.push(newContact);
    return res.status(200).send(contacts);
  }


  getById(req, res, next) {
    const targetContactsIndex = this.findContactIndexById(
      res,
      req.params.contactId
    );

    if (targetContactsIndex === undefined) {
      return res.status(404).send("Not found");
    }

    contacts[targetContactsIndex] = {
      ...contacts[targetContactsIndex],
    };

    return res.status(200).send(contacts[targetContactsIndex]);
  }


  addContact(req, res, next) {
    const targetContactsIndex = this.findContactIndexById(
      res,
      req.params.contactId
    );

    if (targetContactsIndex === undefined) {
      return res.status(400).send("Missing required name field");
    }

    contacts[targetContactsIndex] = {
      ...contacts[targetContactsIndex],
      ...req.body,
    };

    return res.status(200).send(contacts);
  }


  removeContact(req, res, next) {
    const targetContactsIndex = this.findContactIndexById(
      res,
      req.params.contactId
    );

    if (targetContactsIndex === undefined) {
      return res.status(404).send("Not found");
    }

    contacts.splice(targetContactsIndex, 1);
    return res.status(200).send(contacts);
  }

  findContactIndexById(res, contactId) {
    const id = parseInt(contactId);

    const targetContactIndex = contacts.findIndex(
      (contact) => contact.id === id
    );

    if (targetContactIndex === -1) {
      return res.status(404).send("Not found");
    }

    return targetContactIndex;
  }

  validateCreateContact(req, res, next) {
    const createUserRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const result = createUserRules.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    next();
  }
}

module.exports = new ContactController();
