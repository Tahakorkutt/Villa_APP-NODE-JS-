const VillasService = require('../../services/villa/villas_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createVillas= async (req, res, next) => {
  const {villa_location, villa_adress, villa_rooms, villa_user_id, villa_type, villa_attribute, villa_img, villa_furniture, villa_info, villa_service, villa_pool_detail, villa_check_info, villa_popular, villa_description,villa_comission,villa_fixed_price, top_att_name, top_att_color, villa_province, villa_person} = req.body
  
  try {
    const Villas = await VillasService.createVillas(villa_location, villa_adress, villa_rooms, villa_user_id, villa_type, villa_attribute, villa_img, villa_furniture, villa_info, villa_service, villa_pool_detail, villa_check_info, villa_popular, villa_description,villa_comission,villa_fixed_price, top_att_name, top_att_color, villa_province, villa_person)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const updateVillas = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const Villas = await VillasService.updateVillas(_id, obj)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteVillas = async (req, res, next) => {
  const _id = req.params.id

  try {
    const Villas = await VillasService.deleteVillas(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const findAllVillas = async (req, res, next) => {
  try{
    const Villas = await VillasService.findAllVillas()

    res.json(Villas);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const findByIdVillas = async (req, res, next) => {
  const _id = req.params.id
  try{
    const Villas = await VillasService.findByIdVillas(_id)

    res.json(Villas);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createVillas,updateVillas,deleteVillas,findAllVillas,findByIdVillas}