const BaseService = require('../base_service')
const UserDetailModel = require('../../models/user/user_details_model')

class DashboardService extends BaseService {
    findOneByPropertyVillaIdBooking(villa_id) {
        return this.findOneByProperty('villa_id', villa_id)
    }
    async findByEmail(email) {
        return await this.findByProperty('email', email)
    }

    async updateToken(id, token) {
        return await this.update(id, { token })
    }
    async deleteUser(id) {
        return await this.delete(id)
    }
}

module.exports = new DashboardService(UserDetailModel)