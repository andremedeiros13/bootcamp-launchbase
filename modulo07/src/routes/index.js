const express = require('express')
const routes = express.Router()

const HomeController = require('../app/controllers/HomeController')


const products = require('./products')
const users = require('./users')



//Home
routes.get('/',  HomeController.index)

routes.use('/products', products)
routes.use('/users', users)

//ALIAS
routes.get('/ads/create', function(request, response){
    return response.redirect('/products/create')
})

routes.get('/accounts', function(request, response){
    return response.redirect('/users/register')
})



module.exports = routes


//HTTP VERBS
//GET: Receber RESOURCE
//POST: Criar um novo RESOURCE com os dados enviados
//PUT: Atualizar RESOURCE
//DELETE: Deletar RESOURCE


