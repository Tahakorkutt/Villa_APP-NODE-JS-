const VillaServiceService = require('../../services/villa/villa_service_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createVillaService= async (req, res, next) => {
  const {villa_service_name,villa_service_icon,villa_service_main} = req.body
  
  try {
    const villaService = await VillaServiceService.createVillaService(villa_service_name,villa_service_icon,villa_service_main)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const updateVillaService = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const villaService = await VillaServiceService.updateVillaService(_id, obj)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteVillaService = async (req, res, next) => {
  const _id = req.params.id

  try {
    const villaService = await VillaServiceService.deleteVillaService(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const findAllVillaService = async (req, res, next) => {
  try{
    const villaService = await VillaServiceService.findAllVillaService()

    res.json(villaService);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const findByIdVillaService = async (req, res, next) => {
  const _id = req.params.id
  try{
    const villaService = await VillaServiceService.findByIdVillaService(_id)

    res.json(villaService);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createVillaService,updateVillaService,deleteVillaService,findAllVillaService,findByIdVillaService}