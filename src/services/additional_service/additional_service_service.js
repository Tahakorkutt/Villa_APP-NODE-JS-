const BaseService = require('../base_service');
const AdditionalService = require('../../models/additional_service/additional_service_model');

class AdditionalServiceService extends BaseService {
  createAdditionalService(additional_service_name, additional_service_icon, additional_service_price_daily, additional_service_main) {
    return this.create({ additional_service_name, additional_service_icon, additional_service_price_daily, additional_service_main })
  }
  updateAdditionalService(id, obj) {
    return this.update(id, obj)
  }
  deleteAdditionalService(id){
    return this.delete(id)
  }
  findAllAdditionalService(){
    return this.findAll()
  }
  findByIdAdditionalService(id){
    return this.findById(id)
  }
}

module.exports = new AdditionalServiceService(AdditionalService);