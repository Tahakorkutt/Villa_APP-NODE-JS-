const mongoose = require('mongoose')

const TransactionsSchema = new mongoose.Schema({
  rez_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Reservations' },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Users'},
  villa_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Villas'},
  transaction_type: { type: String, required: true},
  total_amount: { type: Number, required: true}, // villa nın tutarı
  trans_action_amount: { type: Number, required: false, default: 0},
  balance: { type: Number, required: true},
  trans_date: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Transactions', TransactionsSchema)