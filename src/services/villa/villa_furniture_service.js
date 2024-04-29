const VillaFurnitureModel = require('../../models/villa/villa_furniture_model')
const BaseService = require('../base_service')

class VillaFurnitureService extends BaseService {
  createVillaFurniture(villa_furniture_name, villa_furniture_icon, villa_furniture_main) {
    return this.create({ villa_furniture_name, villa_furniture_icon, villa_furniture_main })
  }
  deleteAttribute(id) {
    return this.delete(id)
  }
  updateAttribute(id, object) {
    return this.update(id, object)
  }
  getAllVillaAttribute() {
    return this.findAll()
  }
  getAllVillaAttributefindBy(property, value) {
    return this.findBy(property, value)
  }

}

module.exports = new VillaFurnitureService(VillaFurnitureModel)