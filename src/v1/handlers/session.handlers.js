const jwt = require('jsonwebtoken');
const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const User = db.User;
const JWT_SECRET = process.env.JWT_SECRET;

const signin = async(req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await User.findOne({username});
    if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ username: user.username }, JWT_SECRET);
      return res.json({message: 'Login Successfull!!', success: true, token, username: user.username });
    }
  }
  return res.status(422).json({ message: 'username/password is invalid', success: false });
};

module.exports.signin = signin;