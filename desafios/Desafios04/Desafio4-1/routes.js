const express = require('express')

const routes = express.Router()

routes.get("/", function(request, response){
    return response.send("/teachers")
})

routes.get("/students", function(request, response){
    return response.render("students")
})

routes.use(function(request, response) {
    response.status(404).render("not-found");
  });

  module.exports = routes