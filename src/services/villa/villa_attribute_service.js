const VillaAttributeModel = require('../../models/villa/villa_attribute_model')
const BaseService = require('../base_service')

class VillaAttributeService extends BaseService {
    createVillaAttribute(villa_attribute_name, villa_attribute_icon, villa_attribute_main) {
        return this.create({ villa_attribute_name, villa_attribute_icon, villa_attribute_main })
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
    getAllVillaAttributefindBy(id) {
      return this.findById(id)
    }
}

module.exports = new VillaAttributeService(VillaAttributeModel)