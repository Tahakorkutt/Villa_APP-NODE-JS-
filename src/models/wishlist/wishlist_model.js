const mongoose = require('mongoose')

const WishlistSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true  },
  villa_ids : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Villa', required: true  }], 
})

module.exports = mongoose.model('Wishlist', WishlistSchema)