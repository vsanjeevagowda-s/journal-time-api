const jwt = require('jsonwebtoken');
const db = require('../helpers/db');
const bcrypt = require('bcryptjs');
const User = db.User;
const JWT_SECRET = process.env.JWT_SECRET;

const signin = async(req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await User.findOne({email});
    if (user && bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign({ email: user.email }, JWT_SECRET);
      return res.json({message: 'Login Successfull!!', success: true, token, email: user.email });
    }
  }
  return res.status(422).json({ error: 'username/password is invalid', success: false });
};

module.exports.signin = signin;