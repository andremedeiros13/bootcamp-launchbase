const express = require('express')

const routes = express.Router()


routes.get('/', function(resquest, response){
    return response.redirect('/instructors')
})

routes.get('/instructors', function(resquest, response){
    return response.render('instructors/index')
})

routes.get('/members', function(resquest, response){
    return response.render('members')
})

module.exports = routes