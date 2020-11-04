const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const contactsRouter = require("./contacts/contacts.routers");
const cookieParser = require("cookie-parser");
const path = require("path")
const mongoose = require("mongoose");
const errorController = require("./helpers/errController");
const AppError = require("./helpers/AppError");
const authRouter = require("./auth/auth.routers");
const userRouter = require("./users/users.router");
const router = require("./router");
require('dotenv').config({ path: path.join(__dirname, './.env') });

class CrudServer {
  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRouters();
    await this.initDataBase();
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
    this.app.use(cookieParser());
  }

  initRouters() {
    this.app.use("/api/", router);
  }

  async initDataBase() {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
      });
      console.log("Database has been started");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  initErrorHandling() {
    this.app.all("*", (req, res, next) => {
      return next(new AppError(`Can't find ${req.originalUrl}`, 404));
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
