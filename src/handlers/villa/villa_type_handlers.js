const VillaTypeService = require('../../services/villa/villa_type_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createVillaType= async (req, res, next) => {
  const {villa_type_name, villa_type_icon, villa_type_main} = req.body
  
  try {
    const VillaType = await VillaTypeService.createVillaType(villa_type_name, villa_type_icon, villa_type_main)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const updateVillaType = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const VillaType = await VillaTypeService.updateVillaType(_id, obj)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteVillaType = async (req, res, next) => {
  const _id = req.params.id

  try {
    const VillaType = await VillaTypeService.deleteVillaType(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const findAllVillaType = async (req, res, next) => {
  try{
    const VillaType = await VillaTypeService.findAllVillaType()

    res.json(VillaType);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const findByIdVillaType = async (req, res, next) => {
  const _id = req.params.id
  try{
    const VillaType = await VillaTypeService.findByIdVillaType(_id)

    res.json(VillaType);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createVillaType,updateVillaType,deleteVillaType,findAllVillaType,findByIdVillaType}