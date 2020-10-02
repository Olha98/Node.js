const yargs = require("yargs");
const fs = require("fs");
const path = require("path");

const contactsPath = require("./db/contact.json");
console.log(contactsPath)

const argv = yargs
  .number("id")
  .string("name")
  .string("email")
  .string("phone").argv;

const { id, name, email, phone } = contactsPath;

fs.writeFile()
fs.writeFileSync()

const userFaund = contactsPath.filter((contact) => {
  if (id && id !== contact.id) {
    return false;
  }
  if (name && name !== contact.name) {
    return false;
  }

  if (email && email !== contact.email) {
    return false;
  }

  if (phone && phone !== contact.phone) {
    return false;
  }
  return true
});

console.log("userFaund", userFaund);

// TODO: задокументировать каждую функцию

function listContacts() {
  // ...твой код
}

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = {};
