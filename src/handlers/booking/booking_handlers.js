const newBookingService = require('../../services/booking/booking_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");
const newBooking = require('../../services/booking/booking_service');
const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

const createBooking= async (req, res, next) => {
  const {villa_id, date1, date2, price} = req.body
  
  try {
    const existingPrices = await newBookingService.findByPropertyVillaIdBooking(villa_id);
    const newBookings = await newBookingService.createBooking(villa_id, date1, date2, price);
    console.log("existingPrices", existingPrices);

    existingPrices.map((existing) => {
      if(existing.date1 >= newBookings.date1 && existing.date2 <= newBookings.date2){
        newBookingService.deleteBooking(existing._id);
      }else if(existing.date2 >= newBookings.date1 && existing.date2 <= newBookings.date2){
        existing.date2 = new Date(newBookings.date1.getTime() - oneDayInMilliseconds);
        newBookingService.updateBooking(existing._id, existing);
      }else if(existing.date1 <= newBookings.date2 && existing.date2 >= newBookings.date2){
        existing.date1 = new Date(newBookings.date2.getTime() + oneDayInMilliseconds);
        newBookingService.updateBooking(existing._id, existing);
      }
      
    })
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const updateBooking = async (req, res, next) => {
  const id = req.params.id;
  const villa_id = req.body.villa_id;
  const obj = req.body;


  try {
    const existingPrices = await newBookingService.findByPropertyVillaIdBooking(villa_id);
    const newBookings = await newBookingService.updateBooking(id, obj);
    console.log("updateBooking", newBookings)
    const filteredPrices = existingPrices.filter((existing) => existing._id != id);
  
    for (const existing of filteredPrices) {
      console.log("For")
      if (existing.date1 >= newBookings.date1 && existing.date2 <= newBookings.date2) {
        console.log("1");
        await newBookingService.deleteBooking(existing._id);
      } else if (existing.date2 >= newBookings.date1 && existing.date2 <= newBookings.date2) {
        console.log("2");
        existing.date2 = new Date(newBookings.date1.getTime() - oneDayInMilliseconds);
        await newBookingService.updateBooking(existing._id, existing);
      } else if (existing.date1 <= newBookings.date2 && existing.date2 >= newBookings.date2) {
        console.log("3");
        existing.date1 = new Date(newBookings.date2.getTime() + oneDayInMilliseconds);
        await newBookingService.updateBooking(existing._id, existing);
      }
    }
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}

const deleteBooking = async (req, res, next) => {
  const id = req.params.id;

  try {
    await newBookingService.deleteBooking(id);

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createBooking, updateBooking, deleteBooking}