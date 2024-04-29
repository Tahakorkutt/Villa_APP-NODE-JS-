const BaseService = require('../base_service');
const VillaType = require('../../models/villa/villa_type_model');

class VillaTypeService extends BaseService {
  createVillaType(villa_type_name, villa_type_icon, villa_type_main) {
    return this.create({ villa_type_name, villa_type_icon, villa_type_main })
  }
  updateVillaType(id, obj) {
    return this.update(id, obj)
  }
  deleteVillaType(id){
    return this.delete(id)
  }
  findAllVillaType(){
    return this.findAll()
  }
  findByIdVillaType(id){
    return this.findById(id)
  }
}

module.exports = new VillaTypeService(VillaType);