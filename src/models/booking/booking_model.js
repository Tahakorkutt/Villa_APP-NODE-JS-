const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  villa_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Villas' },
  date1: { type: Date, required: true },
  date2: { type: Date, required: true },
  price: { type: Number, required: true }
})

const Booking = mongoose.model('Booking', BookingSchema)
module.exports = Booking