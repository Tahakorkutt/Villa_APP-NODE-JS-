const mongoose = require('mongoose')

const VillaInfoSchema = new mongoose.Schema({
  villa_info_name: { type: String, required: true },
  villa_info_main: { type: Boolean, required: true }
})

const VillaInfo = mongoose.model('VillaInfo', VillaInfoSchema)
module.exports = VillaInfo