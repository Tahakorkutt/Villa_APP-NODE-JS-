const BaseService = require('../base_service')
const UserDetailModel = require('../../models/user/user_details_model')

class UserDetailService extends BaseService {
  async createUserDetail(userId, user_name, first_name, last_name, birth_day, address, email, phone, user_type, age, gender) {
    return await this.create({ userId, user_name, first_name, last_name, birth_day, address, email, phone, user_type, age, gender })
  }
  async deleteUserDetailByUserId(userId){
    return await this.deleteByProperty('userId', userId)
  }
  async findUserDetailByUserId(userId) {
    return await this.findOneByProperty('userId', userId)
  }
  async updateUser(id,obj) {
    return await this.updateByProperty("userId", id, obj)
  }
}

module.exports = new UserDetailService(UserDetailModel)