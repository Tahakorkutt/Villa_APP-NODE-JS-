const BaseService = require('../base_service');
const Villa = require('../../models/villa/villas_model');
// Gerekli diğer modüller

// Villa oluşturma


class VillasService extends BaseService {
  createVillas(villa_location, villa_adress, villa_rooms, villa_user_id, villa_type, villa_attribute, villa_img, villa_furniture, villa_info, villa_service, villa_pool_detail, villa_check_info, villa_popular, villa_description,villa_comission,villa_fixed_price, top_att_name, top_att_color, villa_province, villa_person) {
    return this.create({ villa_location, villa_adress, villa_rooms, villa_user_id, villa_type, villa_attribute, villa_img, villa_furniture, villa_info, villa_service, villa_pool_detail, villa_check_info, villa_popular, villa_description,villa_comission,villa_fixed_price, top_att_name, top_att_color, villa_province, villa_person })
  }
  updateVillas(id, obj) {
    return this.update(id, obj)
  }
  deleteVillas(id){
    return this.delete(id)
  }
  findAllVillas(){
    return this.findAll()
  }
  findByIdVillas(id){
    return this.findById(id)
  }
  findByQueryVillas(query){
    return this.findByQuery(query)
  }
  findMostPopularVillasAll(){
    return this.findAllPopularVillas()
  }
  findVillasById(id) {
    return this.findOneByProperty("_id", id)
  }
  // villa'nin içindeki villa_attribute array'indeki villa_attribute_main true olanları bulma
  async findVillaAsTrueMainAttribute(id) {
    try {
      const villasWithMainAttributeTrue = await Villa.findById(id).populate({
        path: 'villa_attribute',
        match: { villa_attribute_main: true },
        select: 'villa_attribute'
      }).exec();
      return villasWithMainAttributeTrue.villa_attribute.map(villa => villa._id)
    } catch (error) {
      return error
    }
  }
}

module.exports = new VillasService(Villa);




