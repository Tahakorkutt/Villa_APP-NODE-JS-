const BaseService = require('../base_service');
const VillaRatingModel = require('../../models/villa/villa_rating_model');

class VillaRatingService extends BaseService {
  createRating(user_id, villa_id, rating, comment, total_comments,total_rating, now_rating   ) {
    return this.create({ user_id, villa_id, rating,comment, total_comments,total_rating, now_rating })
  }
  updateRating(id, obj) {
    return this.update(id, obj)
  }
  deleteRating(id){
    return this.delete(id)
  }
  findAllRating(){
    return this.findAll()
  }
  findByIdRating(id){
    return this.findById(id)
  }
  findRatingByVillaIdService(villa_id) {
    return this.findByProperty("villa_id", villa_id)
  }
  findLastRating(villa_id) {
    return this.findLastRatingSortedByDate(villa_id)
  }
}

module.exports = new VillaRatingService(VillaRatingModel);