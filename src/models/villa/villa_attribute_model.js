const mongoose = require('mongoose')

const VillaAttributeSchema = new mongoose.Schema({
  villa_attribute_name: { type: String, required: true },
  villa_attribute_icon: { type: String, required: true },
  villa_attribute_main: { type: Boolean, required: true }
  
})

const VillaAttribute = mongoose.model('VillaAttribute', VillaAttributeSchema)
module.exports = VillaAttribute