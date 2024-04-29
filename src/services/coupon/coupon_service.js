const CouponModel = require('../../models/coupon/coupon_model')

const BaseService = require('../base_service')

class couponService extends BaseService {
  createCoupon(coupon_name, coupon_type, coupon_amount) {
    return this.create({ coupon_name, coupon_type, coupon_amount })
  }
  updateCoupon(id, obj) {
    return this.update(id, obj)
  }
  deleteCoupon(id){
    return this.delete(id)
  }
  findAllCoupon(){
    return this.findAll()
  }
  findByIdCoupon(id){
    return this.findById(id)
  }
}

module.exports = new couponService(CouponModel)