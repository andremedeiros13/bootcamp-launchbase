const express = require('express')
const nunjucks = require('nunjucks')
const courses = require('./data')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server
})

server.get("/", function(request, response){
    return response.render("index")
})

server.get("/courses", function(request, response){
    return response.render("courses", { courses })
})

server.get("/about", function(request, response){
    return response.render("about")
})

server.use(function(request, response) {
    response.status(404).render("not-found");
  });

server.listen(3333, function(){
    console.log("Server is runnig")
})
