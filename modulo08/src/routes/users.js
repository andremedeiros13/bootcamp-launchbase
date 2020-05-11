const express = require('express')
const routes = express.Router()

const UserController = require('../app/controllers/UserController')
const SessionController = require('../app/controllers/SessionController')
const OrderController = require('../app/controllers/OrderController')

const UserValidator = require('../app/validators/user')

const SessionValidator = require('../app/validators/session')
const { isLoggedRedirectToUsers, onlyUsers } = require('../app/middlewares/session')


//user
//login/logout
routes.get('/login', isLoggedRedirectToUsers ,SessionController.loginForm)
routes.post('/login', SessionValidator.login ,SessionController.login)
routes.post('/logout', SessionController.logout)


//reset password / forgot
routes.get('/forgot-password', SessionController.forgotForm)
routes.get('/password-reset', SessionController.resetForm)
routes.post('/forgot-password', SessionValidator.forgot ,SessionController.forgot)
routes.post('/password-reset',SessionValidator.reset , SessionController.reset)

//user register UserController
    //criação
    //atualização
    //remoção
routes.get('/register', UserController.registerForm)
routes.post('/register',UserValidator.post, UserController.post)

routes.get('/', onlyUsers , UserValidator.show, UserController.show)
routes.put('/', UserValidator.update,UserController.update)
routes.delete('/', UserController.delete)

routes.get('/ads', UserController.ads)
routes.post('/orders',onlyUsers, OrderController.post)

module.exports = routes