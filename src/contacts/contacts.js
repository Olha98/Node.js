const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const { promises: fsPromise } = fs;

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
    return JSON.parse(await fsPromise.readFile(contactsPath, "utf-8"));

}

async function getContactById(contactId) {
    const result = await listContacts();
    const idUser = result.find(user => user.id === contactId);
    return idUser;
}

async function removeContact(contactId) {
    const data = await listContacts();
    const removedContact = data.filter(user => user.id !== contactId);
    await fsPromise.writeFile(contactsPath, JSON.stringify(removedContact));
} 

async function addContact(name, email, phone) {
    const data = await listContacts();
    const id = uuidv4();
    const addedUser = { id, name, email, phone };
    const updatedList = [...data, addedUser];
    await fsPromise.writeFile(contactsPath, JSON.stringify(updatedList))
    return updatedList;
}


async function updateContact(id, contactParams) {
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
  }

module.exports = { listContacts, getContactById, removeContact, addContact, updateContact };