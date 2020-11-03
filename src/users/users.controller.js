exports.getCurrentUser = (req, res, next) => {
  console.log( res.cookie)
  return res.status(200).send({ //what return on client?
    id: req.user._id,
    email: req.user.email,
  });
};