const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require("./contacts/contacts.routers");
const AppError = require("./helpers/ErrApp");
const errorController = require("./helpers/ErrController");
require('dotenv').config({ path: path.join(__dirname, '../src/.env') });

class CrudServer {
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
  }

  initErrorHandling() {
    this.app.all("*", (req, res, next) => {
      next(new AppError(`Can't fint ${req.originalUrl}`, 404));
    });
    this.app.use(errorController);
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Server started listening on port", process.env.PORT);
    });
  }
}

exports.crudServer = new CrudServer();