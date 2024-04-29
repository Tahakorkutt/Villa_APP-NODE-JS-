const BaseService = require('../base_service');
const VillaProvoinceModel = require('../../models/villa/villa_provoince_model');

class VillaProvoinceService extends BaseService {
  createProvoince(province_name, province_city ) {
    return this.create({ province_name, province_city })
  }
  updateProvoince(id, obj) {
    return this.update(id, obj)
  }
  deleteProvoince(id){
    return this.delete(id)
  }
  findAllProvoince(){
    return this.findAll()
  }
  findByIdProvoince(id){
    return this.findById(id)
  }
}

module.exports = new VillaProvoinceService(VillaProvoinceModel);