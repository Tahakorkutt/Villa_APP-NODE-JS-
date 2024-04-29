const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  coupon_name: { type: String, required: true},
  coupon_type: { type: String, required: true},
  coupon_amount: { type: Number, required: true},
})

module.exports = mongoose.model('Coupon', CouponSchema)
