const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  address: { type: String, required: true },
  tollFreeCustomerCare: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  description: { type: String, required: true },
  whatCanWeHelpWith: { type: String, required: true },
  howCanWeHelp: { type: String, required: true },
  needLiveSupport: { type: String, required: true },
})


const Contact = mongoose.model('Contact', ContactSchema);
module.exports = Contact;
