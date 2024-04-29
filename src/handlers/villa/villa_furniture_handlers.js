const VillaFurnitureService = require('../../services/villa/villa_furniture_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");
// CREATE işlemi
const createVillaFurniture = async (req, res, next) => {
  const { villa_furniture_name, villa_furniture_icon, villa_furniture_main } = req.body;

  try {
    const villaFurniture = await VillaFurnitureService.createVillaFurniture(villa_furniture_name, villa_furniture_icon, villa_furniture_main);

    res.json(Response.succesResponse({ success: true}));
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};


// DELETE işlemi
const deleteVillaFurniture = async (req, res, next) => {
  const { id } = req.params;

  try {
  
    await VillaFurnitureService.deleteFurniture(id);

   
    res.json(Response.succesResponse({ success: true }));
  } catch (err) {
    
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};




// UPDATE işlemi
const updateVillaFurniture = async (req, res, next) => {
  const { id } = req.params;
  const updatedObject = req.body; 

  try {
    
    await VillaFurnitureService.updateFurniture(id, updatedObject);

    
    res.json(Response.succesResponse({ success: true }));
  } catch (err) {
    
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};


// GET işlemi
const getAllVillaFurniture = async (req, res, next) => {
  try {
    const{} = req.params;

    const allVillaFurniture = await VillaFurnitureService.findAll();
    res.json(allVillaFurniture);
   
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
};

// belirtilen özelliğe göre çekme

const getAllVillaFurniturefindBy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getAllVillaFurniture = await VillaFurnitureService.find(id);
    
  
    res.json(getAllVillaFurniture);
  } catch (err) {
    const errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};



module.exports = {createVillaFurniture,deleteVillaFurniture,updateVillaFurniture,getAllVillaFurniture,getAllVillaFurniturefindBy}

