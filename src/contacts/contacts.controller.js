const contacts = require("./contacts");
const errCather = require("../utils/errCatcher")

exports.getContacts = errCather(async (req, res, next) => {
    const contactsList = await contacts.listContacts();
    return res.status(200).json(contactsList);
});

exports.getContactsById = errCather(async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (contact) {
      return res.status(200).json(contact);
    }
    res.status(404).json({ message: "Not found" });
});

exports.addContacts = errCather(async (req, res, next) => {
    const { name, email, phone } = req.body;

    if (name.length) {
      const contactsAdd = await contacts.addContact(name, email, phone);
      return res.status(201).json(contactsAdd);
    }
    return res.status(400).json({ message: "missing required name field" });
});

exports.removeContact = errCather(async (req, res, next) => {
    const { contactId } = req.params;
    const id = await contacts.getContactById(contactId);
    if (id) {
      await contacts.removeContact(contactId);
        return res.status(204).send();
    }
    return res.status(404).json({ message: "Not found" });
});

exports.updateContact = errCather(async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);

      if (!contact) {
    return res.status(404).json({ message: "Not found" });
    }
    const updatedContact = await contacts.updateContact(contactId, req.body);
    return res.status(200).send(updatedContact);
});
