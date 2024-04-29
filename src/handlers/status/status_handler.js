const StatusService = require('../../services/status/status_service');
const Response = require("../../lib/Response");
const Error = require("../../lib/Error");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");

const createStatus = async (req, res, next) => {
  const { ref_id,status_name,background_color,color } = req.body;

  try {
    const createdStatus = await StatusService.createStatusService(ref_id,status_name,background_color,color);

    res.json(Response.succesResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}

const updateStatus = async (req,res,next) => {
  const obj = req.body;
  const _id = req.params.id;

  try {
    const updatedStatus = await StatusService.updateStatusService(_id, obj);

    res.json(Response.succesResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}

const deleteStatus = async (req, res, next) => {
  const _id = req.params.id;

  try {
    await StatusService.deleteStatusService(_id);

    res.json(Response.succesResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}

const findAllStatus = async (req, res, next) => {
  try {
    const allStatus = await StatusService.findAllStatusService();

    res.json(allStatus);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}

const findByIdStatus = async (req, res, next) => {
  const _id = req.params.id;
  try {
    const foundStatus = await StatusService.findByIdStatusService(_id);

    res.json(foundStatus);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
}

module.exports = { createStatus, updateStatus, deleteStatus, findAllStatus, findByIdStatus };
