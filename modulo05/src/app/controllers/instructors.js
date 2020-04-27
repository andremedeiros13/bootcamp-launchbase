const Instructor = require('../models/instructor')
const {age, date} = require('../../lib/utils')

module.exports = {
    
    index(request, response){       
        let {filter, page, limit } = request.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(instructors){
                const pagination = {                    
                    total: Math.ceil(instructors[0].total / limit),
                    page
                }
                
                return response.render('instructors/index', { instructors, pagination, filter })
            }
        }

        Instructor.paginate(params)

        
        // if(filter){
        //     Instructor.findBy(filter, function(instructors){
        //         return response.render('instructors/index', { instructors, filter })

        //     })
        // }else{
        //     Instructor.all(function(instructors){
        //         return response.render('instructors/index', { instructors })
        //     })
        // }
    },

    create(request, response){
    return response.render('instructors/create')
    },

    post(request, response){  
        const keys = Object.keys(request.body)

        for (key of keys){
            if(request.body[key] =="")
                return response.send("Please, fill all fields!")
        }

        Instructor.create(request.body, function(instructor){
            return response.redirect(`/instructors/${instructor.id}`)
        })   
        
    },

    show(request, response){
        
        Instructor.find(request.params.id, function(instructor){
            if(!instructor) return response.send("Instructor not Found!")
            
            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format
            
            return response.render('instructors/show', { instructor })
        })
    },

    edit(request, response){
        Instructor.find(request.params.id, function(instructor){
            if(!instructor) return response.send("Instructor not Found!")
            
        instructor.birth = date(instructor.birth).format
        
        return response.render('instructors/edit', { instructor })
        })        
    },

    put(request, response){
    
        const keys = Object.keys(request.body)

        for (key of keys){
            if(request.body[key] =="")
                return response.send("Please, fill all fields!")
        }

        Instructor.update(request.body, function(){
            return response.redirect(`/instructors/${request.body.id}`)            
        })
        
    },

    delete(request, response){
        Instructor.delete(request.body.id, function(){
            return response.redirect(`/instructors`)
        })
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