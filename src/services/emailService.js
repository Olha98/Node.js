const sgMail = require("@sendgrid/mail");
const path = require("path")
require('dotenv').config({ path: path.join(__dirname, '../.env') });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


exports.checkVerification = async (req, res, next) => {
  const { verificationToken } = req.params;
  console.log("Email sent")
  const verifiedUser = await UserModel.findOneAndUpdate(
    { verificationToken },
    {
      verificationToken: null,
    }
  );
  if (!verifiedUser) {
    return next(new AppError("User not found", 404));
  }
  return res.status(200).send();
};

exports.emailVerificationSender = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: process.env.SENDGRID_SENDER,
    subject: "Hello Node.js",
    text: "Verification",
    html: `<p>For verify your account, please follow this <a href='http://localhost:3000/api/auth/verify/${verificationToken}'>link</a></p> `,
  };
  
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};