const mongoose = require('mongoose')

const AdditionalServiceSchema = new mongoose.Schema({
  additional_service_name: { type: String, required: true },
  additional_service_icon: { type: String, required: true },
  additional_service_price_daily: { type: Number, required: true },
  additional_service_main: { type: Boolean, required: true, default: false }
})

const AdditionalService = mongoose.model('AdditionalService', AdditionalServiceSchema)
module.exports = AdditionalService