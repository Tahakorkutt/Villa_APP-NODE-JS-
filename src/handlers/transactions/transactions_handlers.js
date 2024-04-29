const TransactionsService = require('../../services/transactions/transactions_service')
const Response = require("../../lib/Response");

const createTransactions = async (req, res, next) => {
  const { rez_id, user_id, villa_id, transaction_type, trans_action_amount, balance, trans_date, total_amount } = req.body

  try {
    await TransactionsService.createTransactions({ rez_id, user_id, villa_id, transaction_type, trans_action_amount, balance, trans_date,total_amount  })

    res.json(Response.succesResponse({succes: true}));
  } catch(err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  } 
}

const findByUserId = async (req, res, next) => {
  const user_id = req.params.user_id
  try{
    const transactions = await TransactionsService.findByUserId(user_id)

    res.json(transactions);
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

module.exports = {
  createTransactions,
  findByUserId
}