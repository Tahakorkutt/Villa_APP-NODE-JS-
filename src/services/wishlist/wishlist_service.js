const WishlistModel = require('../../models/wishlist/wishlist_model')
const BaseService = require('../base_service')

class WishlistService extends BaseService {
  createWishlist = async (user_id, villa_id) => {
    const wishlist = await this.findByQuery({ "user_id": user_id })
    if (wishlist.length > 0) {
      const existingVillaIds = wishlist[0].villa_ids;

      if (!existingVillaIds.includes(villa_id)) {
        return await this.update(wishlist[0]._id, { $push: { villa_ids: villa_id } });
      } else {
        return wishlist[0];
      }
    } else {
      return this.create({ user_id, villa_ids: [villa_id] })
    }
  }

  deleteWishlist = async (user_id, villa_id) => {
    const wishlist = await this.findByQuery({ "user_id": user_id })
    if (wishlist.length > 0) {
      const existingVillaIds = wishlist[0].villa_ids;

      if (existingVillaIds.includes(villa_id)) {
        return await this.update(wishlist[0]._id, { $pull: { villa_ids: villa_id } });
      } else {
        return wishlist[0];
      }
    }
  }
  getWishListbyUserId(user_id){
  return this.findOneByProperty(user_id)
  }
}

module.exports = new WishlistService(WishlistModel)
