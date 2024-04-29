const BaseService = require('../base_service')
const MerchantsModel = require('../../models/merchants/merchants_model')

class MerchantsService extends BaseService {
  async createMerchants(merchants) {
    return await this.create(merchants)
  }

  async findByEmail(email) {
    return await this.findByProperty('email', email)
  }

  async updateToken(id, token) {
    return await this.update(id, { token })
  }
  async deleteMerchants(id) {
    return await this.delete(id)
  } 
  async findMerchantsDetailBy(id) {
    return await this.findOneByProperty('id', id)
  }
  async updateMerchants(id, obj) {
    return await this.updateByProperty("id", id, obj);
  }
  async findById(id) {
    return this.model.findById(id)
  }
  async updatePasswordMerchants(id, password) {
    return await this.update(id, { password })
  }
}

module.exports = new MerchantsService(MerchantsModel)