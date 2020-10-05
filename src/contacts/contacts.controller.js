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

  addContact(req, res, next) {
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

  async updateContact(req, res, next) {
    try {
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
    } catch (error) {
      next(error);
    }
  }

  async removeContact(req, res, next) {
    try {
      const targetContactsIndex = this.findContactIndexById(
        res,
        req.params.contactId
      );

      if (targetContactsIndex === -1) {
        throw new NotFoundError("Not found contact");
      }

      contacts.splice(targetContactsIndex, 1);
      return res.status(200).send(contacts);
    } catch (error) {
      next(error);
    }
  }

   findContactIndexById(res, contactId) {
   
      const id = parseInt(contactId);

      const targetContactIndex = contacts.findIndex(
        (contact) => contact.id === id
      );
  
      if (targetContactIndex === -1) {
        throw new NotFoundError("Not found contact");
      }
  
      return targetContactIndex;
  }

  validateAddContact(req, res, next) {
    const createContactRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const result = createContactRules.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }
    next();
  }

  validateUpdateContact(req, res, next) {
    const updateContactRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
    });

    const result = updateContactRules.validate(req.body);
    if (result.error) {
      return res.status(400).send(result.error);
    }

    next();
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);

    this.status = 404;
    delete this.stack;
  }
}

module.exports = new ContactController();
