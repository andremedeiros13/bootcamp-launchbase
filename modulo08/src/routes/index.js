const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')


const products = require('./products')
const users = require('./users')
const cart = require('./cart')
const orders = require('./orders')



//Home
routes.get('/',  HomeController.index)

routes.use('/products', products)
routes.use('/users', users)
routes.use('/cart', cart)
routes.use('/orders', orders)     

//ALIAS
routes.get('/ads/create', function(request, response){
    return response.redirect('/products/create')
})

routes.get('/accounts', function(request, response){
    return response.redirect('/users/login')
})



module.exports = routes


//HTTP VERBS
//GET: Receber RESOURCE
//POST: Criar um novo RESOURCE com os dados enviados
//PUT: Atualizar RESOURCE
//DELETE: Deletar RESOURCE


