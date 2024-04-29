const AdditionalServiceService = require('../../services/additional_service/additional_service_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createAdditionalService= async (req, res, next) => {
  const {additional_service_name, additional_service_icon, additional_service_price_daily, additional_service_main} = req.body
  
  try {
    const AdditionalService = await AdditionalServiceService.createAdditionalService(additional_service_name, additional_service_icon, additional_service_price_daily, additional_service_main)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const updateAdditionalService = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const AdditionalService = await AdditionalServiceService.updateAdditionalService(_id, obj)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteAdditionalService = async (req, res, next) => {
  const _id = req.params.id

  try {
    const AdditionalService = await AdditionalServiceService.deleteAdditionalService(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const findAllAdditionalService = async (req, res, next) => {
  try{
    const AdditionalService = await AdditionalServiceService.findAllAdditionalService()

    res.json(AdditionalService);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const findByIdAdditionalService = async (req, res, next) => {
  const _id = req.params.id
  try{
    const AdditionalService = await AdditionalServiceService.findByIdAdditionalService(_id)

    res.json(AdditionalService);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createAdditionalService,updateAdditionalService,deleteAdditionalService,findAllAdditionalService,findByIdAdditionalService}