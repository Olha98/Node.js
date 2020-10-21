const express = require('express');
const cors = require('cors');
// const contactRouter = require('./contacts/contacts.router');
const authRouter = require('./auth/auth.router');
const mongoose = require('mongoose');

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../src/.env') });

 class AuthServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initRouters();
    await this.initDataBase();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors({ origin: 'http://localhost:3000' }));
  }

  initRouters() {
    // this.server.use('/contacts', contactRouter);
    this.server.use('/auth', authRouter)
  }

  async initDataBase() {
    try {
      await mongoose.connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
      });
      console.log('Database has been started');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

  initErrorHandling() {
    this.server.use((err, req, res, next) => {
      return res.status(err.status || 500).send(err.message);
    });
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log('Server started');
    });
  }
};


exports.authServer = new AuthServer();

