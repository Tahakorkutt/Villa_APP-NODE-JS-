const { body, validationResult, param } = require('express-validator');

const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    res.status(400)
    res.json({ errors: errors.array() })
  } else {
    next()
  }
}


const userRegisterValidationRules =  [
  body('email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('phone').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('password').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('first_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('last_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('address').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('age').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('gender').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('user_type').notEmpty().trim().isLength({ min: 1 }).exists()
]

const userLoginValidationRules =  [
  body('email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('password').notEmpty().trim().isLength({ min: 1 }).exists()
]

const userPasswordChangeValidationRules =  [
  param('id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('old_password').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('new_password').notEmpty().trim().isLength({ min: 1 }).exists()
]


   
const villaServiceValidationRules =  [
  body('villa_service_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_service_icon').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_service_main').notEmpty().trim().isLength({ min: 1 }).exists()
]

const villaFurnitureValidationRules =  [
  body('villa_furniture_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_furniture_icon').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_furniture_main').notEmpty().trim().isLength({ min: 1 }).exists()
]

const villaAttributeValidationRules =  [
  body('villa_attribute_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_attribute_icon').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_attribute_main').notEmpty().trim().isLength({ min: 1 }).exists()
]

const villaInfoValidationRules =  [
  body('villa_info_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_info_main').notEmpty().trim().isLength({ min: 1 }).exists()
]

const villaRoomsValidationRules =  [
  body('villa_rooms_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_rooms_main').notEmpty().trim().isLength({ min: 1 }).exists()
]

const villaTypeValidationRules =  [
  body('villa_type_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_type_icon').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_type_main').notEmpty().trim().isLength({ min: 1 }).exists()
]

const villaValidationRules =  [
  body('villa_location').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_adress').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_rooms').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_user_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_type').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_attribute').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_img').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_furniture').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_info').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_service').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_pool_detail').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_check_info').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_description').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('top_att_color').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_province').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_person').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_fixed_price').notEmpty().trim().isLength({ min: 1 }).exists()
]


const additionalServiceValidationRules =  [
  body('additional_service_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('additional_service_icon').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('additional_service_price_daily').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('additional_service_main').notEmpty().trim().isLength({ min: 1 }).exists()
]

const couponValidationRules =  [
  body('coupon_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('coupon_type').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('coupon_amount').notEmpty().trim().isLength({ min: 1 }).exists()
]

const reservationValidationRules =  [
  body('date1').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('date2').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('total_person').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('rez_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('rez_surname').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('rez_phone').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('rez_email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('rez_type').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('status').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('payment_status').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('user_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('additional_service').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('rez_address').notEmpty().trim().isLength({ min: 1 }).exists()

]


const merchantsRegisterValidationRules =  [
  body('name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('surname').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('address').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('company_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('tax_no').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('phone').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('password').notEmpty().trim().isLength({ min: 1 }).exists(),
  
]
const merchantsLoginValidationRules =  [
  body('email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('password').notEmpty().trim().isLength({ min: 1 }).exists(),
]

const merchantsPasswordChangeValidationRules =  [
  param('id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('old_password').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('new_password').notEmpty().trim().isLength({ min: 1 }).exists()
]

const merchantsTransactions =  [
  body('rez_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('merchant_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('transaction_type').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('trans_action_amount').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('balance').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('rez_email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('phone').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('password').notEmpty().trim().isLength({ min: 1 }).exists(),
  
]

const employeeRegisterValidationRules =  [
  body('name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('surname').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('phone').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('authority').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('password').notEmpty().trim().isLength({ min: 1 }).exists()
]
const employeeLoginValidationRules =  [
  body('email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('password').notEmpty().trim().isLength({ min: 1 }).exists()
]

const transactionsValidationRules =  [
  body('rez_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('user_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('transaction_type').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('balance').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('total_amount').notEmpty().trim().isLength({ min: 1 }).exists(),
]

const bookingValidationRules =  [
  body('villa_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('date1').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('date2').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('price').notEmpty().trim().isLength({ min: 1 }).exists(),
]



const provoinceValidationRules =  [

body('province_name').notEmpty().trim().isLength({ min: 1 }).exists(),
body('province_city').notEmpty().trim().isLength({ min: 1 }).exists(),
]


const ratingValidationRules =  [
  body('rating').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('comment').notEmpty().trim().isLength({ min: 1 }).exists(),
]


const wishlistValidationRules =  [
  param('user_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('villa_id').notEmpty().trim().isLength({ min: 1 }).exists(),
]


const statusValidationRules =  [
  body('ref_id').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('status_name').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('color').notEmpty().trim().isLength({ min: 1 }).exists(),

]

// contact
const contactValidationRules =  [
  body('address').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('tollFreeCustomerCare').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('email', "Geçersiz Email!").notEmpty().trim().isLength({ min: 1 }).exists().isEmail(),
  body('firstName').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('lastName').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('description').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('whatCanWeHelpWith').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('howCanWeHelp').notEmpty().trim().isLength({ min: 1 }).exists(),
  body('needLiveSupport').notEmpty().trim().isLength({ min: 1 }).exists(),

]



//! add user validation
module.exports = {
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
  employeeRegisterValidationRules,
  employeeLoginValidationRules,
  merchantsRegisterValidationRules,
  merchantsLoginValidationRules,
  merchantsPasswordChangeValidationRules,
  reservationValidationRules,
  transactionsValidationRules,
  merchantsTransactions,
  bookingValidationRules,
  provoinceValidationRules,
  ratingValidationRules,
  wishlistValidationRules,
  statusValidationRules,
  contactValidationRules
}