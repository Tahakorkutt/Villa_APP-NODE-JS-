const express = require('express');
const cors = require('cors');
const app = express();
const env = require('dotenv').config()
require('./mongo-connection')

const Router = require('./router')

const {userRegisterValidationRules, userLoginValidationRules, handleInputErrors} = require('./modules/middleware')
const {registerUser, loginUser, logoutUser, deleteUser, updatePasswordUser} = require('./handlers/user/user_handler')
const {protect} = require('./modules/auth') 


app.use(cors());
app.use(express.json())
app.use('/api', protect, Router)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/user-register', userRegisterValidationRules, handleInputErrors, registerUser)
app.post('/user-login', userLoginValidationRules, handleInputErrors, loginUser)
// app.post('/user-logout/:id', handleInputErrors, logoutUser)
// app.delete('/user-delete/:id', handleInputErrors, deleteUser)

app.listen(4000, () => {
  console.log('Server is listening on port 3000');
});
