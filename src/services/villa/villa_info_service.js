const VillaInfoModel = require('../../models/villa/villa_info_model')
const BaseService = require('../base_service')

class VillaInfoService extends BaseService {
  createVillaInfo(villa_info_name, villa_info_main) {
    return this.create({ villa_info_name, villa_info_main })
  }
  updateVillaInfo(id, obj) {
    return this.update(id, obj)
  }
  deleteVillaInfo(id){
    return this.delete(id)
  }
  findAllVillaInfo(){
    return this.findAll()
  }
  findByIdVillaInfo(id){
    return this.findById(id)
  }
}

module.exports = new VillaInfoService(VillaInfoModel)