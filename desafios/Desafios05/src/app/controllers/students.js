const { age, date, studadion } = require('../../lib/utils')
const Student = require('../models/student')


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
            callback(students){
                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }

                return response.render('students/index', { students, pagination, filter })

            }
        }

        Student.paginate(params)


        // Student.all(function(students){
        //     return response.render('students/index', { students })
        // })
    },

    create(request, response){

        Student.teacherSelectOptions(function(options){

            return response.render('students/create', { teacherOptions: options})
        })
    },

    post(request, response){
        const keys = Object.keys(request.body)

        for(key of keys){
            if(request.body[key] == "")
                return response.send("Please, fill all fields!")
        }

        Student.create(request.body, function(student){
            return response.redirect(`/students/${student.id}`)
        })
    },

    show(request, response){ 
        Student.find(request.params.id, function(student){
            if(!student) return response.send("Student not found!")

            student.birth_date = age(student.birth_date)
            student.created_at = date(student.created_at).format

            return response.render('students/show', { student })
        })     
    },

    edit(request, response){
        Student.find(request.params.id, function(student){
            if(!student) return response.send("Student not found!")
            
        student.birth_date = date(student.birth_date).iso
        student.education_year = studadion(student.education_year)

        Student.teacherSelectOptions(function(options){

            return response.render('students/edit', { student, teacherOptions: options })
        })

        })
    },

    put(request, response){        
        const keys = Object.keys(request.body)

        for(key of keys){
            if(request.body[key] == ""){
                return response.send("Please, fill all fields!")
            }
        }

        Student.update(request.body, function(){
            return response.redirect(`/students/${request.body.id}`)
        })
    },

    delete(request, response){
        Student.delete(request.body.id, function(){
            return response.redirect(`/students`)
        })
    }
    
}

// exports.index = function(request, response){
    
//     return response.render("students/index", {students : data.students})

// }

// exports.show = function(request, response){

//     const { id } = request.params

//     const foundStudent = data.students.find(function(student){
//         return student.id == id
//     })

//     if(!foundStudent)
//         return response.send("Student not Found!")


//     const student = {
//         ...foundStudent,
//         birth: age(foundStudent.birth),
//         year_schooling: studadion(foundStudent.year_schooling),
//         created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
//     }

//     return response.render("students/show", { student })

// }
// exports.create = function(request, response){
 
//     return response.render("students/create")
// }

// exports.post = function(request, response) 
// {
//     const keys = Object.keys(request.body)

//     for(key of keys){
//         if(request.body[key] == "")
//             return response.send("Please, fill all fields!")
//     }

//     let {avatar_url, name, email, birth, year_schooling, charge} = request.body

//     birth = Date.parse(birth)
//     const created_at = Date.now()
//     const id = Number(data.students.length + 1)
//     charge = Number(charge)
    

//     data.students.push({
//         id,
//         avatar_url, 
//         name,
//         email, 
//         birth, 
//         year_schooling,
//         charge, 
//         created_at
//     })

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return response.send("Write File error!")

//         return response.redirect('/students')
//     })

// }



// exports.edit = function(request, response){
//     const { id } = request.params

//     const foundStudent = data.students.find(function(student){
//         return student.id == id
//     })

//     if(!foundStudent) return response.send("student not Foun!")

//     const student = {
//         ...foundStudent,
//         birth: date(foundStudent.birth).iso,
//         year_schooling: studadion(foundStudent.year_schooling),
//         created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
//     }

//     return response.render('students/edit', { student })
// }