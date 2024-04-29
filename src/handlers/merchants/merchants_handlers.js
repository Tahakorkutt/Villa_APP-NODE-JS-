const MerchantsService = require('../../services/merchants/merchants_service')
const { comparePasswords, createJWT, hashPassword  } = require('../../modules/auth.js')
const Enum = require('../../config/Enum')
const CustomError = require('../../lib/Error')
const Response = require('../../lib/Response')


const merchantsRegister = async (req, res, next) => {
  const { name, surname, adress, company_name, tax_number, email, phone, taxid_img, password } = req.body

  try {
    const merchants = {
      name,
      surname,
      adress,
      company_name,
      tax_number,
      email,
      phone,
      taxid_img,
      password: await hashPassword(password)
    }
    const newMerchants = await MerchantsService.createMerchants(merchants)

    const token = await createJWT({ id: newMerchants._id, email: newMerchants.email })
    MerchantsService.updateToken(newMerchants._id, token)

    res.json({ token, id: newMerchants._id  })
  }catch (err) {
    if(err.code === 11000) {
      return res.status(400).json({ error: 'User already exists' })
    }
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const merchantsLogin = async (req, res) => {
  try {
    const merchants = await MerchantsService.findByEmail(req.body.email)
    if(!merchants) {
      res.status(401)
      res.json({ message: 'not valid email' })
      return
    }
    const isValid = await comparePasswords(req.body.password, merchants.password)
    if(!isValid) return res.json({ error: 'Invalid password' })
  
    const token = await createJWT({ id: merchants._id, email: merchants.email })
    MerchantsService.updateToken(merchants._id, token)
    res.json({ token, id: merchants._id })
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
} 

const merchantsLogout = async (req, res) => {
  const { id } = req.params;
  try {
    const merchants = await MerchantsService.findById(id);


    if (!merchants) {
      return res.status(400).json({ error: 'Oturum kapatma işlemi başarısız' });
    }

    await MerchantsService.updateToken(id, null);
    res.status(200).json({ message: 'Oturum başarıyla kapatıldı' });
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const merchantsDelete = async (req, res, next) => {
  const { id } = req.params
  try {
    await MerchantsService.deleteMerchants(id)
    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}

const merchantsDetail = async (req, res, next) => {
  const { id } = req.params;
  try {
    const merchantsDetail = await MerchantsService.findMerchantsDetailBy(id);
    const responseObj = {
      name: merchantsDetail.name,
      surname: merchantsDetail.surname,
      email: merchantsDetail.email,
      phone: merchantsDetail.phone,
      address: merchantsDetail.address 
    };
    res.json({ success: true, merchantsDetail: responseObj });
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};


const updateMerchantsDetail = async (req, res, next) => {
  const { id } = req.params;
  const nonEmptyValuesObject = {};

  for (const key in req.body) {
    const value = req.body[key];
    if (value !== "" && value !== null) {
      nonEmptyValuesObject[key] = value;
    }
  }
  try {
    if (Object.keys(nonEmptyValuesObject).length === 0) {
      return res.status(400).json({ message: 'Güncellenecek veri bulunamadı.' });
    }
    const updatedMerchantsDetail = await MerchantsService.updateMerchants(id, nonEmptyValuesObject);

    res.json(Response.successResponse({ operation: "success" }));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
};


const updatePasswordMerchants = async (req, res, next) => {
  const { id } = req.params
  const { old_password, new_password } = req.body

  try {
    const merchants = await MerchantsService.findById(id)
    if(!merchants) return res.json({ operation: "error", error: 'Merchants not found' })

    const isValid = await comparePasswords(old_password, merchants.password)
    if(!isValid) return res.json({ operation: "invalid", error: 'Invalid password' })

    const password = await hashPassword(new_password)
    await MerchantsService.updatePasswordMerchants(id, password)

    res.json({ operation: "success" })
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}





module.exports = {
  merchantsRegister,
  merchantsLogin,
  merchantsLogout,
  merchantsDelete,
  updateMerchantsDetail,
  merchantsDetail,
  updatePasswordMerchants
}
