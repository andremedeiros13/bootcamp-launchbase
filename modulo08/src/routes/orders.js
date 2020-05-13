const express = require('express')
const routes = express.Router()

const OderController = require('../app/controllers/OrderController')

const { onlyUsers } = require('../app/middlewares/session')

routes.post('/', onlyUsers, OderController.post)
routes.get('/', onlyUsers, OderController.index)
routes.get('/sales', onlyUsers, OderController.sales)
routes.get('/:id', onlyUsers, OderController.show)
routes.post('/:id/:action', onlyUsers, OderController.update)

module.exports = routes