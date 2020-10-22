exports.getCurrentUser = (req, res, next) => {

return status(200).send(req.user)
};
