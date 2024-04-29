const ContactService = require('../../services/contact/contact_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createContact = async (req, res, next) => {
  const {businessName, userName, firstName, lastName, email, phoneNumber, description, date} = req.body;
  
  try {
    const contact = await ContactService.createContact( businessName, userName, firstName, lastName, email, phoneNumber, description, date );
  
    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    res.status(500).json(err);
  }
}


const updateContact = async (req, res, next) => {
  const obj = req.body;
  const _id = req.params.id;
  
  try {
    const contact = await ContactService.updateContact(_id, obj);
  
    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteContact = async (req, res, next) => {
  const _id = req.params.id;

  try {
    await ContactService.deleteContact(_id);

    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    res.status(500).json(err);
  }
}

const findAllContact = async (req, res, next) => {
  try {
    const contacts = await ContactService.findAllContact();

    res.json(contacts);
  } catch (err) {
    res.status(500).json(err);
  }
}

const findByIdContact = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const contact = await ContactService.findByIdContact(_id);

    res.json(contact);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {createContact, updateContact, deleteContact, findAllContact, findByIdContact };
