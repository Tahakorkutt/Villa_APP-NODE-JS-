const VillaRatingService = require('../../services/villa/villa_rating_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");
const VillaRatingSchema = require('../../models/villa/villa_rating_model');
const { body } = require('express-validator');


const createRating = async (req, res, next) => {
  const { rating, comment, user_id, villa_id  } = req.body;
  

  try {
    // En son yapılan yorumu bul
    const latestRating = await VillaRatingService.findLastRating(villa_id);

    let total_comments = 1; // Varsa bir yorum vardır, total_comments 1'e eşittir.
    let now_rating = rating; // Varsa en son rating değeri, body'den gelen rating olacaktır.
    let total_rating = rating;

    if (latestRating) {
      total_comments = latestRating.total_comments + 1;
      total_rating = Number(latestRating.total_rating) + Number(req.body.rating);
      now_rating = Number(total_rating) / Number(total_comments);
    }

    // Yeni rating'i oluştur
    const newRating = await VillaRatingService.createRating(
      user_id,
      villa_id,
      rating,
      comment,
      total_comments,
      total_rating,
      now_rating
    );

    res.json(Response.succesResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};




const updateRating = async (req, res, next) => {
  const obj = req.body
  const _id = req.params.id
  
  try {
    const updateRating = await VillaRatingService.updateRating(_id, obj)
  
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteRating = async (req, res, next) => {
  const _id = req.params.id

  try {
    const deleteRating = await VillaRatingService.deleteRating(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const findAllRating = async (req, res, next) => {
  try{
    const findallRating = await VillaRatingService.findAllRating()

    res.json(findallRating);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const findByIdRating = async (req, res, next) => {
  const _id = req.params.id
  try{
    const findbyRating = await VillaRatingService.findByIdRating(_id)

    res.json(findbyRating);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {createRating,updateRating,deleteRating,findAllRating,findByIdRating}