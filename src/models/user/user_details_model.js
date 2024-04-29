const mongoose = require('mongoose')

const userDetailsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Users'},
  user_name: {type: String, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  birth_day: {type: Date, required: true},
  address: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
  user_type: {type: String, required: true, default: 'user'},
  idcard_img: {type: String, default: null},
  idcard_verify: {type: Boolean, default: false},
  register_date: {type: Date, default: Date.now},
  age: {type: Number, required: true},
  gender: {type: String, required: true},
  last_transaction_date: {type: Date, default: Date.now},
})

module.exports = mongoose.model('UserDetails', userDetailsSchema)
