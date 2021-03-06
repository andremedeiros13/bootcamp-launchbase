const express = require('express')
const routes = express.Router()

const multer = require('../app/middlewares/multer')

const ProductController = require('../app/controllers/ProductCrontroller')
const SearchController = require('../app/controllers/SearchController')

const { onlyUsers } = require('../app/middlewares/session')
const Validador = require('../app/validators/product')

//serch
routes.get('/search', SearchController.index)


//Products
routes.get('/create', onlyUsers ,ProductController.create)
routes.get('/:id', ProductController.show)
routes.get('/:id/edit', onlyUsers, ProductController.edit)

routes.post('/', onlyUsers, multer.array("photos", 6), Validador.post, ProductController.post)
routes.put('/', onlyUsers, multer.array("photos", 6), Validador.put ,ProductController.put)
routes.delete('/', onlyUsers, ProductController.delete)

module.exports = routes