const bcrypt = require('bcryptjs');
const db = require('../helpers/db');
const User = db.User;

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

const createUser = async () => {
  try {
    readline.question(`Enter Email : `, async (email) => {
      console.log(`Email : ${email}`)
      readline.question(`Enter Password: `, async (password) => {
        console.log(`Password : ${password}`)
        readline.close();
        const user = new User({ email, password });
        user.password = bcrypt.hashSync(password, 10);
        const response = await user.save();
        console.log('success: ', response);
      })
    })
  } catch (error) {
    readline.close();
    console.log('error', error);
  }
}

createUser();