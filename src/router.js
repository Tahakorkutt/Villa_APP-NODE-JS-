const router = require('express').Router()
const {
  handleInputErrors,
  userRegisterValidationRules,
  userLoginValidationRules,
  userPasswordChangeValidationRules,
  villaInfoValidationRules,
  villaRoomsValidationRules,
  villaServiceValidationRules,
  villaFurnitureValidationRules,
  villaAttributeValidationRules,
  villaTypeValidationRules,
  villaValidationRules,
  additionalServiceValidationRules,
  couponValidationRules,
  merchantsRegisterValidationRules,
  merchantsLoginValidationRules,
  merchantsPasswordChangeValidationRules,
  merchantsTransactions,
  employeeRegisterValidationRules,
  employeeLoginValidationRules,
  reservationValidationRules,
  transactionsValidationRules,
  bookingValidationRules,
  provoinceValidationRules,
  ratingValidationRules,
  wishlistValidationRules,
  statusValidationRules,
  contactValidationRules
 
} = require('./modules/middleware');

const {updatePasswordUser, userDetail, updateUserDetail, registerUser, loginUser, logoutUser, deleteUser} = require('./handlers/user/user_handler');

const {updateVillaAttribute, getAllVillaAttribute, deleteVillaAttribute, getAllVillaAttributefindBy, createVillaAttribute} = require('./handlers/villa/villa_attribute_handlers');
const {createVillaFurniture, deleteVillaFurniture, updateVillaFurniture, getAllVillaFurniture, getAllVillaFurniturefindBy} = require('./handlers/villa/villa_furniture_handlers');
const {createVillaService, updateVillaService, deleteVillaService, findAllVillaService, findByIdVillaService} = require('./handlers/villa/villa_service_handlers');
const {createVillaInfo, updateVillaInfo, deleteVillaInfo, findAllVillaInfo, findByIdVillaInfo} = require('./handlers/villa/villa_info_handlers');
const {createVillaRooms, updateVillaRooms, deleteVillaRooms, findAllVillaRooms, findByIdVillaRooms} = require('./handlers/villa/villa_rooms_handlers');
const {createVillaType, updateVillaType, deleteVillaType, findAllVillaType, findByIdVillaType} = require('./handlers/villa/villa_type_handlers');
const {createVillas, updateVillas, deleteVillas, findAllVillas, findByIdVillas} = require('./handlers/villa/villas_handlers');
const {createAdditionalService,updateAdditionalService,deleteAdditionalService,findAllAdditionalService,findByIdAdditionalService} = require('./handlers/additional_service/additional_service_handlers');
const {createVillaCoupon, updateVillaCoupon,deleteVillaCoupon, findAllVillaCoupon, findByIdVillaCoupon} = require('./handlers/coupon/coupon_handlers');
const {createMerchantsTransactions, getMerchantsTransactions, getMerchantsTransactionsById} = require('./handlers/merchants/merchants_transactions_handlers');
const {getFilters} = require('./handlers/filter/filter_handlers');
const {createProvoince,updateProvoince,deleteProvoince} = require('./handlers/villa/villa _province_handlers');
const {createRating,deleteRating,updateRating} = require('./handlers/villa/villa_rating_handlers');
const{createReservationService,updateReservationService,deleteReservationService,findAllReservationService, findByIdReservationService, findReservationsByUserId } = require('./handlers/reservation/reservation_handlers');
const {employesRegister, employesLogin, employeesLogout, deleteEmployes} = require('./handlers/employes/employees_handlers');
const {merchantsRegister, merchantsLogin, merchantsLogout,merchantsDelete,updatePasswordMerchants,merchantsDetail,updateMerchantsDetail} = require('./handlers/merchants/merchants_handlers');
const {createTransactions, findByUserId} = require('./handlers/transactions/transactions_handlers');
const {createBooking, updateBooking, deleteBooking} = require('./handlers/booking/booking_handlers');

const {createStatus,deleteStatus,updateStatus} = require('./handlers/status/status_handler');

const {createContact,updateContact,deleteContact} = require('./handlers/contact/contact_handler');

const {userDashboard} = require('./handlers/dashboard/user_dashboard_handler');

const {createWishlist, deleteWishlist} = require('./handlers/wishlist/wishlist_handlers');


// router.post('/user-register', userRegisterValidationRules, handleInputErrors, registerUser)
// router.post('/user-login', userLoginValidationRules, handleInputErrors, loginUser)
router.post('/user-logout/:id', handleInputErrors, logoutUser)
router.delete('/user-delete/:id', handleInputErrors, deleteUser)
router.post('/user-update-password/:id', userPasswordChangeValidationRules, handleInputErrors, updatePasswordUser)


router.get('/villa-service', handleInputErrors, findAllVillaService)
router.get('/villa-service/:id', handleInputErrors, findByIdVillaService)
router.post('/villa-service', villaServiceValidationRules, handleInputErrors, createVillaService)
router.patch('/villa-service/:id', handleInputErrors, updateVillaService) // ! burayı sor
router.delete('/villa-service/:id', handleInputErrors, deleteVillaService)

router.post('/villa-furniture', villaFurnitureValidationRules, handleInputErrors, createVillaFurniture)
router.delete('/villa-furniture/:id', deleteVillaFurniture)
router.patch('/villa-furniture/:id', updateVillaFurniture)
router.get('/villa-furniture', getAllVillaFurniture)
router.get('/villa-furniture/:id', getAllVillaAttributefindBy)

router.post('/villa-attribute', villaAttributeValidationRules, handleInputErrors, createVillaAttribute)
router.patch('/villa-attribute/:id', updateVillaAttribute)
router.get('/villa-attribute', getAllVillaAttribute)
router.delete('/villa-attribute/:id', deleteVillaAttribute)
router.get('/villa-attribute/:property/:value', getAllVillaAttributefindBy)

router.get('/villa-info', handleInputErrors, findAllVillaInfo)
router.get('/villa-info/:id', handleInputErrors, findByIdVillaInfo)
router.post('/villa-info', villaInfoValidationRules, handleInputErrors, createVillaInfo)
router.patch('/villa-info/:id', handleInputErrors, updateVillaInfo)
router.delete('/villa-info/:id', handleInputErrors, deleteVillaInfo)

router.get('/villa-rooms', handleInputErrors, findAllVillaRooms)
router.get('/villa-rooms/:id', handleInputErrors, findByIdVillaRooms)
router.post('/villa-rooms', villaRoomsValidationRules, handleInputErrors, createVillaRooms)
router.patch('/villa-rooms/:id', handleInputErrors, updateVillaRooms)
router.delete('/villa-rooms/:id', handleInputErrors, deleteVillaRooms)

router.get('/villa-type', handleInputErrors, findAllVillaType)
router.get('/villa-type/:id', handleInputErrors, findByIdVillaType)
router.post('/villa-type', villaTypeValidationRules, handleInputErrors, createVillaType)
router.patch('/villa-type/:id', handleInputErrors, updateVillaType) //! burayı sor
router.delete('/villa-type/:id', handleInputErrors, deleteVillaType)

router.get('/villas', handleInputErrors, findAllVillas)
router.get('/villas/:id', handleInputErrors, findByIdVillas)
router.post('/villas', villaValidationRules, handleInputErrors, createVillas) //! user id body'den geliyor onu params yap
router.patch('/villas/:id', handleInputErrors, updateVillas) //! burayı sor
router.delete('/villas/:id', handleInputErrors, deleteVillas)

//additional service rout

router.post('/additional-service', additionalServiceValidationRules, handleInputErrors, createAdditionalService)
router.patch('/additional-service/:id', handleInputErrors, updateAdditionalService)
router.delete('/additional-service/:id', handleInputErrors, deleteAdditionalService)
router.get('/additional-service', handleInputErrors, findAllAdditionalService)
router.get('/additional-service/:id', handleInputErrors, findByIdAdditionalService)

//coupon rout

router.post('/coupon', couponValidationRules, handleInputErrors, createVillaCoupon)
router.patch('/coupon/:id', handleInputErrors, updateVillaCoupon)
router.delete('/coupon/:id', handleInputErrors, deleteVillaCoupon)
router.get('/coupon', handleInputErrors, findAllVillaCoupon)
router.get('/coupon/:id', handleInputErrors, findByIdVillaCoupon)


//rezervasyon rout

router.post('/reservation',reservationValidationRules, handleInputErrors, createReservationService)
router.patch('/reservation/:id', handleInputErrors, updateReservationService)
router.delete('/reservation/:id', handleInputErrors, deleteReservationService)
router.get('/reservation/:id', handleInputErrors, findAllReservationService)
router.get('/reservation/:id', handleInputErrors, findByIdReservationService)
router.post('/reservation-history', handleInputErrors, findReservationsByUserId) // rezervasyon geçmişini çek

//merchants rout

router.post('/merchants-register', merchantsRegisterValidationRules, handleInputErrors, merchantsRegister)
router.post('/merchants-login', merchantsLoginValidationRules, handleInputErrors, merchantsLogin)
router.post('/merchants-logout/:id',  handleInputErrors, merchantsLogout)
router.delete('/merchants-delete/:id',  handleInputErrors, merchantsDelete)
router.post('/merchants-update-password/:id', merchantsPasswordChangeValidationRules, handleInputErrors, updatePasswordMerchants)
router.post('/merchants-detail', handleInputErrors, merchantsDetail)
router.post('/merchants-update-detail', handleInputErrors, updateMerchantsDetail)
  
// merchants transactions

router.post('/merchants-transactions', merchantsTransactions, handleInputErrors, createMerchantsTransactions)
router.get('/merchants-transactions/:id',  handleInputErrors, getMerchantsTransactions)
router.get('/merchants-transactions/:id',  handleInputErrors, getMerchantsTransactionsById)


//employee rout

router.post('/employee-register', employeeRegisterValidationRules, handleInputErrors, employesRegister)
router.post('/employee-login', employeeLoginValidationRules, handleInputErrors, employesLogin)
router.post('/employee-logout/:id', handleInputErrors, employeesLogout)
router.delete('/employee-delete/:id', handleInputErrors, deleteEmployes)

//transactions rout

router.post('/transactions', transactionsValidationRules, handleInputErrors, createTransactions)
router.get('/transactions/:user_id', handleInputErrors, findByUserId)

//booking rout

router.post('/booking', bookingValidationRules, handleInputErrors, createBooking)
router.patch('/booking/:id', handleInputErrors, updateBooking)
router.delete('/booking/:id', handleInputErrors, deleteBooking)

router.get('/filter', getFilters)

//provoince
router.post('/provoince', provoinceValidationRules, handleInputErrors, createProvoince)
router.patch('/provoince/:id', handleInputErrors, updateProvoince)
router.delete('/provoince/:id', handleInputErrors, deleteProvoince)

//raiting
router.post('/rating', ratingValidationRules, handleInputErrors, createRating)
router.patch('/rating/:id', handleInputErrors, updateRating)
router.delete('/rating/:id', handleInputErrors, deleteRating)


//dashboards

router.post('/dashboard', handleInputErrors, userDashboard)

//User Detail

router.post('/user_detail' , handleInputErrors, userDetail)
router.post('/user_detail/:userId' , handleInputErrors, updateUserDetail)

//wishlist
router.post('/wishlist/:user_id', wishlistValidationRules, handleInputErrors, createWishlist)
router.delete('/wishlist/:user_id', wishlistValidationRules, handleInputErrors, deleteWishlist)

//status

router.post('/status', statusValidationRules, handleInputErrors, createStatus)
router.patch('/status/:id', handleInputErrors, updateStatus)
router.delete('/status/:id', handleInputErrors, deleteStatus)

// contact

router.post('/contact',   contactValidationRules, handleInputErrors, createContact)
router.patch('/contact/:id', handleInputErrors, updateContact)
router.delete('/contact/:id', handleInputErrors, deleteContact)


module.exports = router