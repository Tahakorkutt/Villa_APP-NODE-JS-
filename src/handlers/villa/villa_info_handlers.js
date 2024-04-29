const VillaInfoService = require('../../services/villa/villa_info_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createVillaInfo= async (req, res, next) => {
  const {villa_info_name, villa_info_main} = req.body
  
  try {
    const VillaInfo = await VillaInfoService.createVillaInfo(villa_info_name, villa_info_main)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const updateVillaInfo = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const VillaInfo = await VillaInfoService.updateVillaInfo(_id, obj)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteVillaInfo = async (req, res, next) => {
  const _id = req.params.id

  try {
    const VillaInfo = await VillaInfoService.deleteVillaInfo(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const findAllVillaInfo = async (req, res, next) => {
  try{
    const VillaInfo = await VillaInfoService.findAllVillaInfo()

    res.json(VillaInfo);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const findByIdVillaInfo = async (req, res, next) => {
  const _id = req.params.id
  try{
    const VillaInfo = await VillaInfoService.findByIdVillaInfo(_id)

    res.json(VillaInfo);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createVillaInfo,updateVillaInfo,deleteVillaInfo,findAllVillaInfo,findByIdVillaInfo}