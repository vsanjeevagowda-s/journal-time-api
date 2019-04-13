require('dotenv').config()
const mongoose = require('mongoose');
console.log('inside db', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model')
};