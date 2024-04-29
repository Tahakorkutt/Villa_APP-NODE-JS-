const MerchantsTransactionsService = require('../../services/merchants/merchants_transactions_service')

const createMerchantsTransactions = async (req, res, next) => {
  try {
    const merchantsTransactions = await MerchantsTransactionsService.createMerchantsTransactions(req.body)
    res.json(merchantsTransactions)
  }catch(e) {
    e.type = "input"
    next(e)
  }
}
const getMerchantsTransactions = async (req, res) => {
  const merchantsTransactions = await MerchantsTransactionsService.findAll()
  res.json(merchantsTransactions)
}


const getMerchantsTransactionsById = async (req, res) => {
  const merchantsTransactions = await MerchantsTransactionsService.findById(req.params.id)
  res.json(merchantsTransactions)
}


const updateMerchantsTransactions = async (req, res, next) => {
  const obj = req.body;
  const _id = req.params.id;

  try {
    const VillaRezervation = await RezervationService.updateMerchantsTransactions(id, token);

    res.json(Response.successResponse({ success: true }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
module.exports = {
  createMerchantsTransactions,
  getMerchantsTransactions,
  getMerchantsTransactionsById,
  updateMerchantsTransactions
}