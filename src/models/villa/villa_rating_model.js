const mongoose = require('mongoose')

const VillaRatingSchema = new mongoose.Schema({
  villa_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Villas' },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Users' },
  rating: {type: Number,required: true,},
  comment: {type: String, required: true,},
  total_comments: { type: Number, },
  total_rating: { type: Number, },
  now_rating: { type: Number, },
  date: { type: Date, default: Date.now } 
});



const VillaRating = mongoose.model('VillaRating', VillaRatingSchema)
module.exports = VillaRating