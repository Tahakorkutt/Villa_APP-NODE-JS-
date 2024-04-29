const mongoose = require('mongoose');

const villaTypeSchema = new mongoose.Schema({
  villa_type_name: { type: String, required: true },
  villa_type_icon: { type: String, required: true },
  villa_type_main: { type: Boolean, required: true }
});

module.exports = mongoose.model('VillaType', villaTypeSchema);
