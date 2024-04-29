const BookingModel = require('../../models/booking/booking_model')
const BaseService = require('../base_service')

class newBookingService extends BaseService {
  createBooking(villa_id, date1, date2, price) {
    return this.create({ villa_id, date1, date2, price })
  }
  updateBooking(id, obj) {
    return this.update(id, obj)
  }
  deleteBooking(id){
    return this.delete(id)
  }
  findByPropertyVillaIdBooking(villa_id){
    return this.findByProperty('villa_id', villa_id)
  }
  findOneByPropertyVillaIdBooking(villa_id){
    return this.findOneByProperty('villa_id', villa_id)
  }
}

module.exports = new newBookingService(BookingModel)