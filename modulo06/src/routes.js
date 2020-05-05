const express = require('express')
const ProductController = require('./app/controllers/ProductCrontroller')
const HomeController = require('./app/controllers/HomeController')
const SearchController = require('./app/controllers/SearchController')
const multer = require('./app/middlewares/multer')


const routes = express.Router()

//Home
routes.get('/',  HomeController.index)

//serch
routes.get('/products/search', SearchController.index)


//Products
routes.get('/products/create', ProductController.create)
routes.get('/products/:id', ProductController.show)
routes.get('/products/:id/edit', ProductController.edit)

routes.post('/products', multer.array("photos", 6), ProductController.post)
routes.put('/products', multer.array("photos", 6), ProductController.put)
routes.delete('/products', ProductController.delete)



//ALIAS
routes.get('/ads/create', function(request, response){
    return response.redirect('/products/create')
})




module.exports = routes


//HTTP VERBS
//GET: Receber RESOURCE
//POST: Criar um novo RESOURCE com os dados enviados
//PUT: Atualizar RESOURCE
//DELETE: Deletar RESOURCE