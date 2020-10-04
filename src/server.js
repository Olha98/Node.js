const express = require('express');
const cors = require('cors');
const contactRouter = require('./contacts/contacts.router')

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../src/.env") });


class ContactsServer{
constructor(){
	this.server = null;
}

start() {
    this.initServer();
    this.initMiddlewares();
    this.initRouters();
    this.startListening();
  }

	initServer(){
		this.server = express();
	}

	initMiddlewares(){
		this.server.use(express.json());
		this.server.use(cors({origin:"http://localhost:3000"}))
	}


	initRouters(){
this.server.use('/contacts', contactRouter)
	}


	startListening(){
		this.server.listen(process.env.PORT, ()=>{
			console.log('Server started')
		})
	}

	
}

exports.ContactsServer = ContactsServer;
exports.contactsServer = new ContactsServer();
