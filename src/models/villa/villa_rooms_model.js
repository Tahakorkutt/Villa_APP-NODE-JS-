const mongoose = require('mongoose')

const VillaRoomsSchema = new mongoose.Schema({
  villa_rooms_name: { type: String, required: true },
  villa_rooms_main: { type: Boolean, required: true }
})

const VillaRooms = mongoose.model('VillaRooms', VillaRoomsSchema)
module.exports = VillaRooms