const VillaRoomsModel = require('../../models/villa/villa_rooms_model')
const BaseService = require('../base_service')

class VillaRoomsService extends BaseService {
  createVillaRooms(villa_rooms_name, villa_rooms_main) {
    return this.create({ villa_rooms_name, villa_rooms_main })
  }
  updateVillaRooms(id, obj) {
    return this.update(id, obj)
  }
  deleteVillaRooms(id){
    return this.delete(id)
  }
  findAllVillaRooms(){
    return this.findAll()
  }
  findByIdVillaRooms(id){
    return this.findById(id)
  }
}

module.exports = new VillaRoomsService(VillaRoomsModel)