const VillaRoomsService = require('../../services/villa/villa_rooms_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createVillaRooms= async (req, res, next) => {
  const {villa_rooms_name, villa_rooms_main} = req.body
  
  try {
    const VillaRooms = await VillaRoomsService.createVillaRooms(villa_rooms_name, villa_rooms_main)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const updateVillaRooms = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const VillaRooms = await VillaRoomsService.updateVillaRooms(_id, obj)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteVillaRooms = async (req, res, next) => {
  const _id = req.params.id

  try {
    const VillaRooms = await VillaRoomsService.deleteVillaRooms(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const findAllVillaRooms = async (req, res, next) => {
  try{
    const VillaRooms = await VillaRoomsService.findAllVillaRooms()

    res.json(VillaRooms);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const findByIdVillaRooms = async (req, res, next) => {
  const _id = req.params.id
  try{
    const VillaRooms = await VillaRoomsService.findByIdVillaRooms(_id)

    res.json(VillaRooms);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createVillaRooms,updateVillaRooms,deleteVillaRooms,findAllVillaRooms,findByIdVillaRooms}