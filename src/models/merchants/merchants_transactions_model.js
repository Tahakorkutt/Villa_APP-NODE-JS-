const mongoose = require('mongoose')

const merchantsTransactionsSchema = new mongoose.Schema({
    rez_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reservations'},
    merchant_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reservations'},
    villa_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Reservations'},
    transaction_type: { type: Number, required: true},
    trans_action_amount: { type: Number, required: true},
    balance: { type: Number, required: true},
    trans_date: { type: Date, default: Date.now}
})

module.exports = mongoose.model('MerchantsTransactions', merchantsTransactionsSchema)
