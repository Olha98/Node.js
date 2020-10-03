const fs = require("fs");
const path = require("path");

const { promises: fsPromise } = fs;
const contactsPath = path.join(__dirname, "./db/contact.json");

async function listContacts() {
  const res = JSON.parse(await fsPromise.readFile(contactsPath, "utf-8"));
  // console.log(res,"res")
  return res;
}

async function getContactById(contactId) {
  try {
    const contactsList = await listContacts();
    return contactsList.find((contact) => contact.id === contactId);
  } catch (err) {
    console.log(err);
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
  }
}

async function addContact(name, email, phone) {
  try {
    const contactsList = await listContacts();
    const id = contactsList.length ? [...contactsList].pop().id + 10 : 1;
    const newContact = { id, name, email, phone };
    await fsPromise.writeFile(
      contactsPath,
      JSON.stringify([...contactsList, newContact])
    );
    console.log(newContact);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
