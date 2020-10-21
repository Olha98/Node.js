const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const contactsRouter = require("./contacts/contacts.router");
const morgan = require("morgan");
const dotenv = require('dotenv');

dotenv.config();
const PORT = 3000

class CrudServer {
    constructor() {
        this.app = null
    }
    start() {
        this.initServer();
        this.initMiddlewares();
        this.initRouters();
        this.initErrorHandling();
        this.startListening();
    }

    initServer() {
        this.app = express();
    }
    initMiddlewares() {
        this.app.use(express.json());
        this.app.use(cors({ origin: "http://localhost:3000" }));
        this.app.use(morgan("combined"));
    }

    initRouters() {
        this.app.use("/contacts", contactsRouter);
        this.app.use((req, res) => res.status(404).json({ message: 'Not found, try to move on correct adress' }));

    }

    initErrorHandling() {
        this.app.use((err, req, res, next) => {
            return res.status(err.status || 500).send(err.message);
        })
}

    startListening() {
        this.app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    }
}

exports.CrudServer = CrudServer;
exports.crudServer = new CrudServer();
