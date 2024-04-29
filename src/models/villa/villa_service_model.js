const mongoose = require('mongoose')

const VillaServiceSchema = new mongoose.Schema({
  villa_service_name: { type: String, required: true },
  villa_service_icon: { type: String, required: true },
  villa_service_main: { type: String, required: true }
})

const VillaService = mongoose.model('VillaService', VillaServiceSchema)
module.exports = VillaService