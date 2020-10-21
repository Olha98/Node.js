const bcryptjs = require('bcryptjs')


async function main() {
  const password = 'qwerty'

  const salt = await bcryptjs.genSalt(10);
  const passwordHash = await bcryptjs.hash(password, '$2a$10$oHlTT8xEyX7HZP78Uo7A3e');
  console.log(passwordHash)

  const isValid = await bcryptjs.compare(password, passwordHash)
  console.log(isValid)
}

main()