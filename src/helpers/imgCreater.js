const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: "public/images",
  filename: function (req, file, cb) {
    const ext = path.parse(file.originalname).ext;
    cb(null, uuidv4() + ext);
  },
});

const upload = multer({ storage });

exports.updateImage = upload.single("avatar");