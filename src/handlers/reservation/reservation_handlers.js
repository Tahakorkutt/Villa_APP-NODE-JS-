const RezervationService = require('../../services/reservation/reservation_service');
const VillaService = require('../../services/villa/villas_service');
const VillaTypeService = require('../../services/villa/villa_type_service');
const TransactionService = require('../../services/transactions/transactions_service');
const StatusService = require('../../services/status/status_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createReservationService = async (req, res, next) => {
  const {
    villa_id, date1, date2,
    user_id, total_person,
    rez_name, rez_surname, rez_phone, rez_email, rez_address,
    rez_type, status, payment_status, additional_service, coupon_id
  } = req.body;

  try {
    const reservations = await RezervationService.findReservationByVillaIdService(villa_id);
    console.log(reservations);
    let existreservation = false;
    await Promise.all(reservations.map(async (reservation) => {
      if (new Date(date1) <= new Date(reservation.date2) && new Date(date2) >= new Date(reservation.date1)) {
        existreservation = true;
      }
    }));

    if (!existreservation) {
      await RezervationService.createReservationService(
        villa_id, user_id, date1, date2, total_person,
        rez_name, rez_surname, rez_phone, rez_email, rez_address,
        rez_type, status, payment_status, additional_service, coupon_id
      );
      res.json(Response.succesResponse({ success: true }));
    } else {
      console.log("Uyuşmayan tarihlerde rezervasyon yapılıyor.");
      res.status(400).json(Response.errorResponse({ message: "Uyuşmayan tarihlerde rezervasyon yapamazsınız." }));
    }
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}


const updateReservationService = async (req, res, next) => {
  const obj = req.body;
  const _id = req.params.id;

  try {
    const VillaRezervation = await RezervationService.updateReservationService(_id, obj);

    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const deleteReservationService = async (req, res, next) => {
  const _id = req.params.id;

  try {
    const VillaRezervation = await RezervationService.deleteReservationService(_id);

    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const findAllReservationService = async (req, res, next) => {
  try {
    const VillaRezervation = await RezervationService.findAllReservationService();

    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const findByIdReservationService = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const VillaRezervation = await RezervationService.findByIdReservationService(_id);

    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const findReservationsByUserId = async (req, res, next) => {
  const { user_id, status } = req.body;

  try {
    const reservations = await RezervationService.findReservationsByUserId(user_id);
    const responseArray = [];
    await Promise.all(reservations.map(async (reservation) => {

      if (!req.body.status){
          let obj = {}
          const villa = await VillaService.findByIdVillas(reservation.villa_id);
          const villaType = await VillaTypeService.findByIdVillaType(villa.villa_type[0]);
          const transaction = await TransactionService.findTransactionsByReservationId(reservation._id)
          console.log(transaction)
          const statusres = await StatusService.findByQueryStatusService(reservation.status)
  
          obj.type = villa.villa_province
          obj.title = villaType.villa_type_name + " " + villa.villa_province
          obj.created_at = reservation.created_at,
          obj.date1 = reservation.date1,
          obj.date2 = reservation.date2,
          obj.total = transaction.total_amount,
          obj.paid = transaction.trans_action_amount,
          obj.remain = transaction.balance,
          obj.status = statusres.status_name,
          responseArray.push(obj);
      }

      if (status && reservation.status === status) {
        let obj = {}
        const villa = await VillaService.findByIdVillas(reservation.villa_id);
        const villaType = await VillaTypeService.findByIdVillaType(villa.villa_type[0]);
        const transaction = await TransactionService.findTransactionsByReservationId(reservation._id)
        const statusres = await StatusService.findByQueryStatusService(reservation.status)

        obj.type = villa.villa_province
        obj.title = villaType.villa_type_name + " " + villa.villa_province
        obj.created_at = reservation.created_at,
        obj.date1 = reservation.date1,
        obj.date2 = reservation.date2,
        obj.total = transaction.total_amount,
        obj.paid = transaction.trans_action_amount,
        obj.remain = transaction.balance,
        obj.status = statusres.status_name == null ? " " : statusres.status_name,
        responseArray.push(obj);
      }
    }));

    res.json(responseArray);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createReservationService, updateReservationService,findAllReservationService,findByIdReservationService,deleteReservationService, findReservationsByUserId}