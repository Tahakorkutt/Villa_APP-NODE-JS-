const BaseService = require('../base_service')
const MerchantsTransactionsModel = require('../../models/merchants/merchants_transactions_model')

class MerchantsTransactionsService extends BaseService {
    async createMerchantsTransactions(merchantsTransactions) {
        return await this.create(merchantsTransactions)
    }
    
    async findByEmail(email) {
        return await this.findByProperty('email', email)
    }
    
    async updateToken(id, token) {
        return await this.update(id, { token })
    }
}
class getMerchantsTransactions extends BaseService {
    async findAll() {
        return await this.find()
    }
}
class getMerchantsTransactionsById extends BaseService {
    async findById(id) {
        return await this.findById(id)
    }
}

module.exports = new MerchantsTransactionsService(MerchantsTransactionsModel)