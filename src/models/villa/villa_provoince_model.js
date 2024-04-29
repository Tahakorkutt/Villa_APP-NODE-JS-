const mongoose = require('mongoose');

const villaProvoinceSchema = new mongoose.Schema({
  province_name: {type: String,required: true,},
  province_city: {type: String,required: true
  }
});;

const VillaProvoince = mongoose.model('VillaProvoince', villaProvoinceSchema);
module.exports = VillaProvoince