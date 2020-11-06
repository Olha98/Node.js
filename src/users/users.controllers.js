const UserModel = require("../auth/user.model");
const AppError = require("../helpers/AppError");


exports.getCurrentUser = (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      user: {
        email: req.user.email,
        subscription: req.user.subscription,
        id: req.user._id,
      },
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await UserModel.findById(id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }
  await UserModel.findByIdAndDelete(id);

  return res.status(204).end();
};

exports.updateUserInfo = async (req, res, next) => {
  const { user } = req;
  const { file } = req;

  const newImagePath = `http://localhost:3000/images/${file.filename}`;

  const updatedImage = await UserModel.findByIdAndUpdate(
    user._id,
    {
      avatarURL: newImagePath,
    },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    avatarURL: updatedImage.avatarURL,
  });
};