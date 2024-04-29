const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  villa_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Villas' },//sor
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref:'Users' },//sor
  date1: { type: Date, required: true },
  date2: { type: Date, required: true },
  total_person: { type: Number, required: true },
  rez_name: { type: String, required: true },
  rez_surname: { type: String, required: true },
  rez_phone: { type : String, required: true },
  rez_email: { type: String, required: true },
  rez_address: { type: String, required: true },
  rez_type: { type: Number, required: true }, // 0-online rez, 1-acenta rez, 2-manuel rez
  status: { type: String, required: true, default: "1" }, // 0-Onay bekliyor, 1-Ödeme Bekliyor, 2-Onaylandı, 3-Tamamlandı
  payment_status: { type: Number, required: true }, // 0-Kapora Bekliyor, 1-Tam ödeme bekliyor, 2-Kısmi Ödeme Yapıldı, 3-Ödeme Tamamlandı
  additional_service:{ type: Array , required: true}, // Ek hizmetler: [1, 2, 3, 4] gibi bir dizi
  coupon_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }, // Kupon ID'si ve sor,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation',reservationSchema);
