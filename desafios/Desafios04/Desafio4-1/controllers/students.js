const data = require('../data.json')
const fs = require('fs')
const { age, date, studadion } = require('../utils')


exports.index = function(request, response){
    
    return response.render("students/index", {students : data.students})

}

exports.show = function(request, response){

    const { id } = request.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if(!foundStudent)
        return response.send("Student not Found!")


    const student = {
        ...foundStudent,
        birth: age(foundStudent.birth),
        year_schooling: studadion(foundStudent.year_schooling),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundStudent.created_at)
    }

    return response.render("students/show", { student })

}
exports.create = function(request, response){
 
    return response.render("students/create")
}

exports.post = function(request, response) 
{
    const keys = Object.keys(request.body)

    for(key of keys){
        if(request.body[key] == "")
            return response.send("Please, fill all fields!")
    }

    let {avatar_url, name, email, birth, year_schooling, charge} = request.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.students.length + 1)
    charge = Number(charge)
    

    data.students.push({
        id,
        avatar_url, 
        name,
        email, 
        birth, 
        year_schooling,
        charge, 
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return response.send("Write File error!")

        return response.redirect('/students')
    })

}



exports.edit = function(request, response){
    const { id } = request.params

    const foundStudent = data.students.find(function(student){
        return student.id == id
    })

    if(!foundStudent) return response.send("student not Foun!")

    const student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso,
        year_schooling: studadion(foundStudent.year_schooling),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
    }

    return response.render('students/edit', { student })
}