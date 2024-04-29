const BaseService = require('../base_service')
const EmployeesModel = require('../../models/employes/employees_model')

class EmployeesService extends BaseService {
  async createEmployees(employees) {
    return await this.create(employees)
  }

  async findByEmail(email) {
    return await this.findByProperty('email', email)
  }

  async updateToken(id, token) {
    return await this.update(id, { token })
  }
 
  
  async deleteEmployees(id) {
    return await this.delete(id)
  }
}

module.exports = new EmployeesService(EmployeesModel)