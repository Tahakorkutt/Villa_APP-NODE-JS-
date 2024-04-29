const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  phone: { type: String, required: true},
  password: { type: String, required: true},
  token: { type: String, required: false, default: null},
  //! add role to user
})

module.exports = mongoose.model('User', userSchema)