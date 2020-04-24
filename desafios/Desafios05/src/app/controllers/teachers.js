const { age, date, graduation } = require('../utils')



module.exports = {
    
    index(request, response){
    return response.render('teachers/index')
    },

    create(request, response){

    return 

    },

    post(request, response){
         
    return    
    },

    show(request, response){ 
    return 
    },

    edit(request, response){
        return

    },

    put(request, response){        
        return
    },

    delete(request, response){
        return
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