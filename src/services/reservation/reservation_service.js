const BaseService = require('../base_service')
const ReservationModel = require('../../models/reservation/reservation_model.js')


class ReservationService extends BaseService {
  createReservationService(villa_id, user_id,  date1, date2,total_person,rez_name, rez_surname,rez_phone, rez_email,rez_address,rez_type,status,payment_status,additional_service,coupon_id) {
      return this.create({ villa_id, user_id,  date1, date2,total_person,rez_name, rez_surname,rez_phone, rez_email,rez_address,rez_type,status,payment_status,additional_service,coupon_id })
    }
  deleteReservationService(id) {
    return this.delete(id)
  }
  updateReservationService(id, object) {
    return this.update(id, object)
  }
  findAllReservationService() {
    return this.findAll()
  }
  findByIdReservationService(id) {
    return this.findBy(id)
  } 
  findReservationByVillaIdService(villa_id) {
    return this.findByProperty("villa_id", villa_id)
  }
  async findReservationsByUserId(user_id) {
    return this.findByProperty("user_id", user_id)
  }
  async findWaitingReservationsByUserId(user_id) {
    return this.findByProperties({ user_id, status: false })
  }
  async findNextBookingByUserId(user_id) {
    return this.findNextSortedByDateUser(user_id)
  }
  async findLast5ReservationsByUserId(user_id) {
      return this.findLastSortedByDateUser(user_id)
  }
 
}

module.exports = new ReservationService(ReservationModel)