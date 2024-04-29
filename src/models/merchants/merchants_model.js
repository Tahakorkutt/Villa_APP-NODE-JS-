const mongoose = require('mongoose');

const merchantsSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tüccarın adı
  surname: { type: String, required: true }, // Tüccarın soyadı
  address: { type: String, required: false }, // Tüccarın adresi
  company_name: { type: String, required: true }, // Şirket adı
  tax_no: { type: String, required: false }, // Vergi numarası
  email: { type: String, required: true, unique: true }, // Tüccarın e-posta adresi (unique olmalı)
  phone: { type: String, required: true }, // Tüccarın telefon numarası
  commission: { type: Number, required: false, default: 0 }, // Komisyon yüzdesi
  taxid_img: { type: String }, // Kimlik Resmi
  company_verify: { type: Boolean, required: false, default: false }, // Kimlik Doğrulaması (0 yapılmadı, 1 yapıldı)
  register_date: { type: Date, default: Date.now }, // Üye kayıt tarihi (varsayılan olarak şu an)
  last_transaction_date: { type: Date },// Son işlem tarihi
  password: { type: String, required: true }, // Çalışanın şifresi
  token: { type: String, required: false, default:null } 

});


module.exports = mongoose.model('Merchants', merchantsSchema);