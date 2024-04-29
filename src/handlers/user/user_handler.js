const UserService = require('../../services/user/user_service')
const UserDetailService = require('../../services/user/user_details_service')
const { comparePasswords, createJWT, hashPassword  } = require('../../modules/auth.js')
const validator = require('validator')
const Enum = require('../../config/Enum')
const CustomError = require('../../lib/Error')
const Response = require('../../lib/Response')

const registerUser = async (req, res, next) => {
  const { email, phone, password, user_name, first_name, last_name, birth_day, address, age, gender, user_type } = req.body

  try {

    const user = {
      email,
      phone,
      password: await hashPassword(password)
    }
    const newUser = await UserService.createUser(user)
    UserDetailService.createUserDetail(newUser._id, user_name, first_name, last_name, birth_day, address, email, phone, user_type, age, gender)

    const token = await createJWT({ id: newUser._id, email: newUser.email })
    UserService.updateToken(newUser._id, token)

    res.json({ token, id: newUser._id });
  }catch (err) {
    if(err.code === 11000) {
      return res.status(400).json({ error: 'User already exists' })
    }
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await UserService.findByEmail(req.body.email)

    if(!user) return res.json({ error: 'User not found' })
  
    const isValid = await comparePasswords(req.body.password, user.password)

    if(!isValid) return res.json({ error: 'Invalid password' })
  
    const token = await createJWT({ id: user._id, email: user.email })

    UserService.updateToken(user._id, token)
    res.json({ token, id: user._id })
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

} 
 
// User Logut
const logoutUser = async (req, res, next) => { // sor
  const id = req.params.id; 
  try {
    const user = await UserService.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Kullanıcı bulunamadı' }); // sor
    }

    const updateResult = await UserService.updateToken(id, null) // sor

    res.json({ success: true, message: 'Oturum başarıyla sonlandırıldı' });
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteUser = async (req, res, next) => {
  const _id = req.params.id
  try {
    await UserService.deleteUser(_id)

    await UserDetailService.deleteUserDetailByUserId(_id)

    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const updatePasswordUser = async (req, res, next) => {
  const { id } = req.params
  const { old_password, new_password } = req.body

  try {
    const user = await UserService.findById(id)
    if(!user) return res.json({ operation: "error", error: 'User not found' })

    const isValid = await comparePasswords(old_password, user.password)
    if(!isValid) return res.json({ operation: "invalid", error: 'Invalid password' })

    const password = await hashPassword(new_password)
    await UserService.updatePasswordUser(id, password)

    res.json({ operation: "success" })
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const userDetail = async (req, res, next) => {
  const _id = req.query.user_id
  console.log(_id)
  try {
    const userDetail = await UserDetailService.findUserDetailByUserId(_id)
    console.log(userDetail)
    const responseObj = {
      user_name: userDetail.user_name,
      firs_name: userDetail.firs_name,
      last_name: userDetail.last_name,
      email: userDetail.email,
      phone: userDetail.phone,
      birth_day: userDetail.birth_day,
      adress: userDetail.address
    };

  res.status(200).json({ responseObj });
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}
const updateUserDetail = async (req, res, next) => {
  const obj = req.body

  const { userId } = req.params

  const nonEmptyValuesObject = {};

  // obj yerine req.body gelecek
  for (const key in obj) {
    const value = obj[key];
    if (value !== "" && value !== null) {
      nonEmptyValuesObject[key] = value;
    }
  }

  // objede dolu bir key varsa sadece onu alarak işleme devam edecek
  if(Object.keys(nonEmptyValuesObject).length !== 0) {
    try {
      const UserDetail = await UserDetailService.updateUser(userId, nonEmptyValuesObject)
    
      res.json(Response.succesResponse({operation: "success"}));
    } catch (err) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(Response.errorResponse(err));
    }
  } else {
    let errorResponse = Response.errorResponse({message: "Boş veri gönderildiğinden güncellenmedi"});
    res.status(errorResponse.code).json(Response.errorResponse({message: "Boş veri gönderildiğinden güncellenmedi"}));
  }

}


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  deleteUser,
  userDetail,
  updateUserDetail,
  updatePasswordUser
}
