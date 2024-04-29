const VillaAttributeService = require('../../services/villa/villa_attribute_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");
// CREATE işlemi


const createVillaAttribute = async (req, res, next) => {
  const { villa_attribute_name, villa_attribute_icon, villa_attribute_main } = req.body;

  try {
    const createAttribute = await VillaAttributeService.createVillaAttribute(villa_attribute_name, villa_attribute_icon, villa_attribute_main);
    res.json(Response.succesResponse({succes: true}));

    res.json(createAttribute);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

//DELETE işlemi

const deleteVillaAttribute = async (req, res, next) => {
  const { id } = req.params;

  try {
    await VillaAttributeService.deleteAttribute(id);

    res.json(Response.succesResponse({succes: true}));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
};


//UPDATE işlemi

const updateVillaAttribute = async (req, res, next) => {
  const {id, object } = req.params;

  try {
    await VillaAttributeService.updateAttribute(id, object);
    res.json(Response.succesResponse({succes: true}));

  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
};


// GET işlemi

const getAllVillaAttribute = async (req, res, next) => {
  try {
    const allVillaAttribute = await VillaAttributeService.getAllVillaAttribute();
    res.json(allVillaAttribute);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}; 

// belirtilen özelliğe göre çekme

const getAllVillaAttributefindBy = async (req, res, next) => {
  try {
    const{id } = req.params;
    const allVillaAttribute = await VillaAttributeService.getAllVillaAttributefindBy(id)
    res.json(allVillaAttribute);
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};


module.exports = {createVillaAttribute,  deleteVillaAttribute, updateVillaAttribute, getAllVillaAttribute, getAllVillaAttributefindBy}; 
