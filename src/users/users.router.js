const { Router } = require("express");
const { authorize } = require("../helpers/authorize");
const { errCatch } = require("../helpers/ErrCatch");
const { updateImage } = require("../helpers/imagesCreator");
const { getCurrentUser, updateUserInfo } = require("./users.controllers");
const { deleteUser } = require("./users.controllers");
const userRouter = Router();

userRouter.get("/current", errCatch(authorize), getCurrentUser);
userRouter.delete("/:id", errCatch(authorize), errCatch(deleteUser));
userRouter.patch(
  "/avatars",
  errCatch(authorize),
  updateImage,
  errCatch(updateUserInfo)
);

module.exports = userRouter;