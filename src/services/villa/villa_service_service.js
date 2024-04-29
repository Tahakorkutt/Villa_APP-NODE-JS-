const VillaServiceModel = require('../../models/villa/villa_service_model')
const BaseService = require('../base_service')

class VillaServiceService extends BaseService {

  createVillaService(villa_service_name,villa_service_icon,villa_service_main,villa_id, name, rating, comments,total_comments,now_raiting,date) {
    return this.create({villa_service_name,villa_service_icon,villa_service_main,villa_id, name, rating, comments,total_comments,now_raiting,date })
  }
  updateVillaService(id, obj) {
    return this.update(id, obj)
  }
  deleteVillaService(id){
    return this.delete(id)
  }
  findAllVillaService(){
    return this.findAll()
  }
  findByIdVillaService(id){
    return this.findById(id)
  }

}

module.exports = new VillaServiceService(VillaServiceModel)