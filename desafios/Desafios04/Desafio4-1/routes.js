const express = require('express')

const routes = express.Router()

routes.get("/", function(request, response){
    return response.redirect("/teachers")
})
routes.get("/teachers", function(request, response){
    return response.render("teachers/index")
})
routes.post("/teachers", function(request, response){
    return response.render("teachers/create")
})

routes.get("/students", function(request, response){
    return response.render("students/index")
})


routes.use(function(request, response) {
    response.status(404).render("not-found");
  });

  module.exports = routes