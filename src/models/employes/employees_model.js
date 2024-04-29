const mongoose = require('mongoose');

const Employees = new mongoose.Schema({
  name: { type: String, required: true }, // Çalışanın adı
  surname: { type: String, required: true }, // Çalışanın soyadı
  email: { type: String, required: true, unique: true }, // Çalışanın e-posta adresi 
  phone: { type: String }, // Çalışanın telefon numarası
  authority: { type: String, required: true }, // Çalışanın yetkisi
  password: { type: String, required: true }, // Çalışanın şifresi
  token: { type: String, required: false, default:null } 
});

module.exports = mongoose.model('Employee', Employees);