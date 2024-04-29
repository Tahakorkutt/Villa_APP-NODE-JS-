const CouponService = require('../../services/coupon/coupon_service');
const Response = require("../../lib/Response.js");
const Error = require("../../lib/Error.js");
const Enum = require("../../config/Enum.js");
const CustomError = require("../../lib/Error.js");

const createVillaCoupon = async (req, res, next) => {
  const { coupon_name, coupon_type, coupon_amount } = req.body;

  try {
    const Coupon = await CouponService.createCoupon(coupon_name, coupon_type, coupon_amount);
    res.json(Response.succesResponse({ success: true  }));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};

//update
const updateVillaCoupon = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const updateCoupon = await CouponService.updateCoupon(_id, obj)
    res.json(Response.succesResponse({succes: true }));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
//delete 
const deleteVillaCoupon = async (req, res, next) => {
  const _id = req.params.id

  try {
    const deleteCoupon = await CouponService.deleteCoupon(_id)
    res.json(Response.succesResponse({succes: true}));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const findAllVillaCoupon = async (req, res, next) => {
  try {
    const coupon = await CouponService.findAllCoupon();
    res.json(coupon)
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}

const findByIdVillaCoupon = async (req, res, next) => {
  const _id = req.params.id
  try{
    const Coupon = await CouponService.findByIdCoupon(_id)
    res.json(Coupon)

  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}

module.exports = {createVillaCoupon, updateVillaCoupon,deleteVillaCoupon, findAllVillaCoupon, findByIdVillaCoupon}