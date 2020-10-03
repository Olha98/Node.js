const contacts = require('./contacts');

const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
		console.table(await contacts.listContacts());
      break;

    case 'get':
		console.log( await  contacts.getContactById(id))
      // ... id
      break;

    case 'add':
		 console.log(await contacts.addContact(name, email, phone))
      // ... name email phone
      break;

    case 'remove':
		 console.log(await contacts.removeContact(id))
      // ... id
      break;

    default:
		console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);