const express = require("express");
const authRouter = require("./auth/auth.routers");
const contactsRouter = require("./contacts/contacts.routers");
const userRouter = require("./users/users.router");

const app = express();
app.use("/contacts", contactsRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

module.exports = app;