const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "../../db/contacts.json");

const { promises: fsPromise } = fs;

async function listContacts() {
  return JSON.parse(await fsPromise.readFile(contactsPath, "utf-8"));
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    return contactsList.find((contact) => contact.id === contactId);
  } catch (err) {
    console.log(err.message);
    throw new AppError(err);
  }
}

async function removeContact(contactId) {
  try {
    const contactsList = await listContacts();
    const filteredList = contactsList.filter(
      (contact) => contact.id !== contactId
    );
    await fsPromise.writeFile(contactsPath, JSON.stringify(filteredList));
  } catch (err) {
    console.log(err);
    throw new AppError(err);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const contactsList = await listContacts();
    const id = uuidv4();
    const newContact = { id, name, email, phone };
    await fsPromise.writeFile(
      contactsPath,
      JSON.stringify([...contactsList, newContact])
    );
    return newContact;
  } catch (err) {
    console.log(err);
    throw new AppError(err);
  }
}

async function updateContact(id, contactParams) {
  try {
    const contactsList = await listContacts();
    const contactIndex = contactsList.findIndex((contact) => contact.id === id);
    if (contactIndex === -1) {
      return;
    }

    contactsList[contactIndex] = {
      ...contactsList[contactIndex],
      ...contactParams,
    };

    await fsPromise.writeFile(contactsPath, JSON.stringify([...contactsList]));

    return contactsList[contactIndex];
  } catch (err) {
    console.log(err);
    throw new AppError(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};