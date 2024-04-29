const BaseService = require('../base_service');
const contactModel = require('../../models/contact/contact_model');

class ContactService extends BaseService {
  createContact(address, tollFreeCustomerCare, email, firstName, lastName, description, whatCanWeHelpWith, howCanWeHelp, needLiveSupport) {
    try {
      return this.create({ address, tollFreeCustomerCare, email, firstName, lastName, description, whatCanWeHelpWith, howCanWeHelp, needLiveSupport });
    } catch (error) {
      throw new Error(`Contact create failed: ${error.message}`);
    }
  }

  updateContact(id, obj) {
    try {
      return this.update(id, obj);
    } catch (error) {
      throw new Error(`Contact update failed: ${error.message}`);
    }
  }

  deleteContact(id) {
    try {
      return this.delete(id);
    } catch (error) {
      throw new Error(`Contact deletion failed: ${error.message}`);
    }
  }

  findAllContact() {
    try {
      return this.findAll();
    } catch (error) {
      throw new Error(`Failed to retrieve all contacts: ${error.message}`);
    }
  }

  findByIdContact(id) {
    try {
      return this.findById(id);
    } catch (error) {
      throw new Error(`Failed to find contact by ID: ${error.message}`);
    }
  }

  
}

module.exports = new ContactService(contactModel);
