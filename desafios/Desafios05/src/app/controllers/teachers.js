const { age, date, graduation, classTyp } = require('../../lib/utils')
const Teacher = require('../models/teacher')



module.exports = {
    
    index(request, response){

        let {filter, page, limit} = request.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers){
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page                    
                }
               // return console.log(pagination)

                return response.render('teachers/index', { teachers, pagination, filter })

            }
        }

        Teacher.paginate(params)
        // const {filter }  = request.query

        // if(filter){
        //     Teacher.findBy(filter, function(teachers){
        //     return response.render('teachers/index', { teachers, filter })

        //     })
        // } else {
        //     Teacher.all(function(teachers){
        //     return response.render('teachers/index', { teachers })       
        // })} 
    
    },

    create(request, response){
        return response.render('teachers/create')
    },

    post(request, response){
        const keys = Object.keys(request.body)

        for(key of keys){
            if(request.body[key] == "")
                return response.send("Please, fill all fields!")
        }

        Teacher.create(request.body, function(teacher){
            return response.redirect(`/teachers/${teacher.id}`)
        })
    },

    show(request, response){ 
        Teacher.find(request.params.id, function(teacher){
            if(!teacher) return response.send("Techar not found!")

            teacher.birth_date = age(teacher.birth_date)
            teacher.education_level// = graduation(teacher.education_level)
            teacher.class_type = classTyp(teacher.class_type)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.created_at = date(teacher.created_at).format

            return response.render('teachers/show', { teacher })
        })     
    },

    edit(request, response){
        Teacher.find(request.params.id, function(teacher){
            if(!teacher) return response.send("Teacher not found!")
            
        teacher.birth_date = date(teacher.birth_date).iso

        return response.render('teachers/edit', { teacher })
        })
    },

    put(request, response){        
        const keys = Object.keys(request.body)

        for(key of keys){
            if(request.body[key] == ""){
                return response.send("Please, fill all fields!")
            }
        }

        Teacher.update(request.body, function(){
            return response.redirect(`/teachers/${request.body.id}`)
        })
    },

    delete(request, response){
        Teacher.delete(request.body.id, function(){
            return response.redirect(`/teachers`)
        })
    },
    
}

// exports.index = function(request, response){
//     return response.render("teachers/index", {teachers : data.teachers})
// }

// exports.create = function(request, response){
 
//     return response.render("teachers/create")
// }

// exports.post = function(request, response) 
// {
//     const keys = Object.keys(request.body)

//     for(key of keys){
//         if(request.body[key] == "")
//             return response.send("Please, fill all fields!")
//     }

//     let {avatar_url, name, birth, schooling, teaching, area} = request.body

//     birth = Date.parse(birth)
//     const created_at = Date.now()
//     const id = Number(data.teachers.length + 1)
    

//     data.teachers.push({
//         id,
//         avatar_url, 
//         name, 
//         birth, 
//         schooling, 
//         teaching, 
//         area,
//         created_at
//     })

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return response.send("Write File error!")

//         return response.redirect('/teachers')
//     })

// }

// exports.show = function(request, response){

//     const { id } = request.params

//     const foundTeacher = data.teachers.find(function(teacher){
//         return teacher.id == id
//     })

//     if(!foundTeacher)
//         return response.send("Teacher not Found!")


//     const teacher = {
//         ...foundTeacher,
//         birth: age(foundTeacher.birth),
//         area:foundTeacher.area.split(","),
//         schooling: graduation(foundTeacher.schooling),
//         created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
//     }

//     return response.render("teachers/show", { teacher })

// }

// exports.edit = function(request, response){
//     const { id } = request.params

//     const foundTeacher = data.teachers.find(function(teacher){
//         return teacher.id == id
//     })

//     if(!foundTeacher) return response.send("Teacher not Foun!")

//     const teacher = {
//         ...foundTeacher,
//         birth: date(foundTeacher.birth).iso
//     }

//     return response.render('teachers/edit', { teacher })
// }