const BaseService = require('../base_service')
const TransactionsModel = require('../../models/transactions/transactions_model')

class TransactionsService extends BaseService {
  async createTransactions(transactions) {
    return await this.create(transactions)
  }
  async findByUserId(user_id) {
    return await this.findByProperty('user_id', user_id)
  }
  async findTransactionByUserIdService(user_id) {
    return this.findByProperty(user_id)
  }
  async findTransactionByUserOneIdService(user_id) {
    return this.findOneByProperty(user_id)
  }
  async findTransactionByReservationIdService(rez_id) {
    return this.findByProperty(rez_id)
  }
  async findTransactionsByReservationId(reservation_id) {
    return await this.findOneByProperty('rez_id', reservation_id)
  }
}

module.exports = new TransactionsService(TransactionsModel)