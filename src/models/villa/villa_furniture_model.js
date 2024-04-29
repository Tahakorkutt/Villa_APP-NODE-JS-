const mongoose = require('mongoose')

const VillaFurnitureSchema = new mongoose.Schema({
  villa_furniture_name: { type: String, required: true },
  villa_furniture_icon: { type: String, required: true },
  villa_furniture_main: { type: Boolean, required: true }
})

const VillaFurniture = mongoose.model('VillaFurniture', VillaFurnitureSchema)
module.exports = VillaFurniture