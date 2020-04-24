const express = require('express')
const teachers = require('./app/controllers/teachers')
const students = require('./app/controllers/students')

const routes = express.Router()

routes.get("/", function(request, response){
    return response.redirect("/teachers")
})
routes.get("/teachers", teachers.index)
routes.get("/teachers/create", teachers.create )
routes.post("/teachers", teachers.post )
routes.get("/teachers/:id", teachers.show )
routes.get('/teachers/:id/edit', teachers.edit )


routes.get("/students", students.index)
routes.get("/students/create", students.create )
routes.post("/students", students.post )
routes.get("/students/:id", students.show )
routes.get('/students/:id/edit', students.edit )


routes.use(function(request, response) {
    response.status(404).render("not-found");
  });

  module.exports = routes