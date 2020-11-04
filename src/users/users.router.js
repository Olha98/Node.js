const { Router } = require("express");
const { authorize } = require("../helpers/authorize");
const { errCatch } = require("../helpers/ErrCatch");
const { getCurrentUser } = require("./users.controllers");
const { deleteUser } = require("./users.controllers");
const userRouter = Router();

userRouter.get("/current", errCatch(authorize), getCurrentUser);
userRouter.delete("/:id", errCatch(authorize), errCatch(deleteUser));

module.exports = userRouter;