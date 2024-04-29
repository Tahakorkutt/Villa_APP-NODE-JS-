const VillasService = require('../../services/villa/villas_service');
const StatusService = require('../../services/status/status_service')
const Enum = require('../../config/Enum');
const CustomError = require('../../lib/Error');
const Response = require('../../lib/Response');
const ReservationService = require('../../services/reservation/reservation_service');
const TransactionService = require('../../services/transactions/transactions_service');
const VillaTypeService = require('../../services/villa/villa_type_service')

const userDashboard = async (req, res, next) => {
    const { user_id } = req.body;

    try {

        const transactions = await TransactionService.findTransactionByUserIdService(user_id)
        const waitingPayments = transactions.reduce((total, transaction) => {
            return total + (transaction.balance || 0);
        }, 0)

        const waitingReservations = await ReservationService.findWaitingReservationsByUserId(user_id)

        const nextBookingReservation = await ReservationService.findNextBookingByUserId(user_id)
        const villa = await VillasService.findVillasById(nextBookingReservation.villa_id)
        const nextBooking = villa.villa_province + " " + nextBookingReservation.date1
        const responseArray = []
        const last5Reservations = await ReservationService.findLast5ReservationsByUserId(user_id);
        await Promise.all(last5Reservations.map(async (reservation) => {
            const villas = await VillasService.findVillasById(reservation.villa_id);
            const transaction = await TransactionService.findTransactionByUserOneIdService(reservation.user_id);
            const statusres = await StatusService.findByQueryStatusService(reservation.status)
            console.log(statusres)
            const villatype = await VillaTypeService.findByIdVillaType(villas.villa_type)
            const totalAmount = transaction.total_amount
            const paidAmount = transaction.trans_action_amount


            responseArray.push( {
                Name: villas.villa_province + " " + villatype.villa_type_name,
                Total: totalAmount,
                Paid: paidAmount,
                Status: statusres.status_name == null ? " " : statusres.status_name,
                CreatedAt: reservation.created_at
            });
        }));

        const responseObj =  {Data:[{
            waiting_payments: waitingPayments.toString(),
            waiting_reservation: waitingReservations.length.toString(),
            next_booking: nextBooking,
            last5Reservations: responseArray
    }]};
    console.log(responseObj)
        res.status(200).json(responseObj);
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code || 500).json(errorResponse);
    }
};

module.exports = {
    userDashboard
};
