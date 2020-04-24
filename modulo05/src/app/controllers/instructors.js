const {age, date} = require('../../lib/utils')

module.exports = {
    index(request, response){
    return response.render('instructors/index')
    },

    create(request, response){

    return response.render('instructors/create')

    },

    post(request, response){
         
    let { avatar_url, birth, name, services, gender } = request.body
    
    const keys = Object.keys(request.body)

    for (key of keys){
        if(request.body[key] =="")
            return response.send("Please, fill all fields!")
    }

    return
    
    },

    show(request, response){ 
    return 
    },

    edit(request, response){
        const { id } = request.params

    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id

    })

    if(!foundInstructor){
        return response.send("Instructor not found!")
    }    

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return response.render('instructors/edit', { instructor})
    },

    put(request, response){
    
        const keys = Object.keys(request.body)

        for (key of keys){
            if(request.body[key] =="")
                return response.send("Please, fill all fields!")
        }
        
        return
    },

    delete(request, response){
        return
    },
}

// exports.index = function(request, response){

//     return response.render('instructors/index', {instructors: data.instructors})
// }

// //create
// exports.create =  function(request, response){
//     return response.render('instructors/create')}


// //post
// exports.post = function(request, response){ 
//     //request.query 
//     //Retorna pelo ID

//     //request.body
//     //{"avatar_url": "https://www.google.com.br/","name": "andre","birth": "1991-03-22","gender": "M","services": "teste, teste2, teste3"}

//     //keys
//     //["avatar_url","name","birth","gender","services"]
    
//     let { avatar_url, birth, name, services, gender } = request.body
    
//     const keys = Object.keys(request.body)

//     for (key of keys){
//         if(request.body[key] =="")
//             return response.send("Please, fill all fields!")
//     }

//     birth = Date.parse(birth)
//     const created_at = Date.now()
//     const id = Number(data.instructors.length + 1) 


//     data.instructors.push({
//         id,
//         avatar_url,
//         name,
//         birth,
//         gender,
//         services,
//         created_at
//     })
    
//     fs.writeFile("data.json", JSON.stringify(data,null, 2),function(err){
//         if(err) return response.send("write File error")

//         return response.redirect('/instructors')
//     })

//     //  return response.send(request.body)
// }

// //show
// exports.show = function(request, response) {
//     //request.paras.id = /:id

//     const { id } = request.params

//     const foundInstructor = data.instructors.find(function(instructor){
//         return instructor.id == id

//     })

//     if(!foundInstructor){
//         return response.send("Instructor not found!")

//     }    

//     const instructor = {
//         ...foundInstructor,
//         age: age(foundInstructor.birth),        
//         services: foundInstructor.services.split(",") ,
//         created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)

//     }
    
    
//     return response.render("instructors/show", { instructor })


// }


// //edit 
// exports.edit = function(request, response){

//     const { id } = request.params

//     const foundInstructor = data.instructors.find(function(instructor){
//         return instructor.id == id

//     })

//     if(!foundInstructor){
//         return response.send("Instructor not found!")
//     }    

//     const instructor = {
//         ...foundInstructor,
//         birth: date(foundInstructor.birth).iso
//     }

//     return response.render('instructors/edit', { instructor})
// }

// //PUT

// exports.put = function(request, response) {
//     const { id } = request.body
//     let index = 0

//     const foundInstructor = data.instructors.find(function(instructor, foundIndex){
//         if(id == instructor.id){
//             index = foundIndex
//             return true
//         }

//     })

//     if(!foundInstructor)
//         return response.send("Instructor not found!")
    
//     const instructor = {
//         ...foundInstructor,
//         ...request.body,
//         birth: Date.parse(request.body.birth),
//         id: Number(request.body.id)     
//     }

//     data.instructors[index] = instructor

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return response.send ("write error!")

//         return response.redirect(`/instructors/${id}`)
//     })
// }

// //delete

// exports.delete = function(request, response){
//     const { id } = request.body

//     const filteredInstructors = data.instructors.filter(function(instructor){
//         return instructor.id != id
//     })


//     data.instructors = filteredInstructors

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return response.send ("write error!")

//         return response.redirect('/instructors')
//     })
// }