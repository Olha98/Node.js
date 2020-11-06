const AvatarGenerator = require("avatar-generator");
const path = require("path");
const avatar = new AvatarGenerator();
const { v4: uuidv4 } = require("uuid");

const variant = "feme";

exports.generateAvatar = async function generateAvatar() {
  const image = await avatar.generate("email@example.com", variant);
  const point = path.join(__dirname, "../../public/images/");
  const nameAvatar = `${uuidv4()}.png`;
  image.png().toFile(`${point}${nameAvatar}`);
  return nameAvatar;
};