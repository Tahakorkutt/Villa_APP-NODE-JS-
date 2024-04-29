
const VillaProvoinceService = require('../../services/villa/villa_provoince_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createProvoince= async (req, res, next) => {
  const {province_name,province_city} = req.body
  
  try {
    const createProvoince = await VillaProvoinceService.createProvoince(province_name,province_city)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const updateProvoince = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const updateProvoince = await VillaProvoinceService.updateProvoince(_id, obj)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteProvoince = async (req, res, next) => {
  const _id = req.params.id

  try {
    const deleteProvoince = await VillaProvoinceService.deleteProvoince(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const findAllProvoince = async (req, res, next) => {
  try{
    const finallProvoince = await VillaProvoinceService.findAllProvoince()

    res.json(finallProvoince);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const findByIdProvoince = async (req, res, next) => {
  const _id = req.params.id
  try{
    const findbyProvoince = await VillaProvoinceService.findByIdProvoince(_id)

    res.json(findbyProvoince);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createProvoince, updateProvoince,deleteProvoince,findAllProvoince,findByIdProvoince}