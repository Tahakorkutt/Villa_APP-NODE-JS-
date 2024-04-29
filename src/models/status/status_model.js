const mongoose = require('mongoose');

const statusSchema = new mongoose.Schema({
  ref_id: { type: String, required: true, unique: true },
  status_name: { type: String, required: true },
  background_color: { type: String, required: true },
  color: { type: String, required: true },

});

const StatusModel = mongoose.model('Status', statusSchema);
module.exports = StatusModel;
