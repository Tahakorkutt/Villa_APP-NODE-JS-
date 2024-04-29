const EmployeesService = require('../../services/employes/employees_service')
const { comparePasswords, createJWT, hashPassword  } = require('../../modules/auth.js')
const Enum = require('../../config/Enum')
const CustomError = require('../../lib/Error')
const Response = require('../../lib/Response')

const employesRegister = async (req, res, next) => {
  const { name, surname, email, phone, password, authority} = req.body

  try {
    const employees = {
      name,
      surname,
      email,
      phone,
      authority,
      password: await hashPassword(password)
    }
    const newEmployees = await EmployeesService.createEmployees(employees)

    const token = await createJWT({ id: newEmployees._id, email: newEmployees.email })
    EmployeesService.updateToken(newEmployees._id, token)

    res.json({ token, id: newEmployees._id  })
  }catch (err) {
    if(err.code === 11000) {
      return res.status(400).json({ error: 'User already exists' })
    }
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}

const employesLogin = async (req, res) => {
  try {
    const employees = await EmployeesService.findByEmail(req.body.email)
    if(!employees) {
      res.status(401)
      res.json({ message: 'not valid email' })
      return
    }
    const isValid = await comparePasswords(req.body.password, employees.password)
    if(!isValid) return res.json({ error: 'Invalid password' })
  
    const token = await createJWT({ id: employees._id, email: employees.email })
    EmployeesService.updateToken(employees._id, token)
    res.json({ token, id: employees._id })
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
} 

const employeesLogout = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Veritabanından çalışanı bulma
    const employees = await EmployeesService.findById(id);

    if (!employees) {
      return res.status(404).json({ error: 'Çalışan bulunamadı' });
    }

    await EmployeesService.updateToken(id, null);

    return res.status(200).json({ message: 'Oturum başarıyla iptal edildi' });
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }
}
const deleteEmployes = async (req, res, next) => {
  const id = req.params.id
  try {
    await EmployeesService.deleteEmployees(id)


    res.json(Response.succesResponse({succes: true}));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(Response.errorResponse(err));
  }

}



module.exports = {
  employesRegister,
  employesLogin,
  employeesLogout,
  deleteEmployes
}
