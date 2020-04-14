const express = require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server,
    autoescape: false,
    noCache:true
})

server.get("/", function(request, response) {
    const about = {
        avatar_url: "https://media-exp1.licdn.com/dms/image/C4E03AQEuyRIh_v3CaA/profile-displayphoto-shrink_200_200/0?e=1591833600&v=beta&t=njXQceLIrBe8gThlrErZCoYGq1es88TnKEkDv3KdwuY",
        name: "Andre Antonio de Medeiros",
        role: "Analista de Desenvolvimento 1 - Totvs",
        description: 'Trabalho com Densenvolvimento e teste de software em linguagem C#, atualmente na <a href="https://www.totvs.com/" target="_blank">Totvs</a>',
        links: [
            {name: "GitHub", url: "https://github.com/andremedeiros13"},
            {name: "Twitter", url: "https://twitter.com/Andre13Medeiros"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/andre-antonio-de-medeiros-5a368417b/"}
        ]
    }


    return response.render("about", {about})

})

server.get("/portifolio", function(request, response) {
    return response.render("portifolio", {items: videos})

})

server.get("/video", function(request, response){
    const id = request.query.id

    const video = videos.find(function(video){        
        return video.id == id
    })
    if(!video){
        return response.send('video not found!')
    }

    return response.render('video', {item: video})
})


server.listen(5000, function() {
    console.log("server is running")
})





