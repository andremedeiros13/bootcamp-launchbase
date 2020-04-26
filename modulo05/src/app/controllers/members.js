const {age, date} = require('../../lib/utils')
const Member = require('../models/member')


module.exports = {
    
    index(request, response){
       
        Member.all(function(members){
            return response.render('members/index', { members })
        })

    },

    create(request, response){

        Member.instructorsSelectOptions(function(options){

            return response.render('members/create', { instructorOptions: options })
        })
    },

    post(request, response){ 
        const keys = Object.keys(request.body)

        for (key of keys){
            if(request.body[key] =="")
                return response.send("Please, fill all fields!")
    }

    Member.create(request.body, function(member){
        return response.redirect(`/members/${member.id}`)
    })   
    
    },

    show(request, response){ 
        
        Member.find(request.params.id, function(member){
            if(!member) return response.send("Member not Found!")
            
            member.birth = date(member.birth).birthDay
            
            return response.render('members/show', { member })
        })
    },

    edit(request, response){


        Member.find(request.params.id, function(member){
            if(!member) return response.send("Member not Found!")
            
            member.birth = date(member.birth).iso

            
        Member.instructorsSelectOptions(function(options){

            return response.render('members/edit', { member, instructorOptions: options })
        })           
            
        })        
    },

    put(request, response){
    
        const keys = Object.keys(request.body)

        for (key of keys){
            if(request.body[key] =="")
                return response.send("Please, fill all fields!")
        }

        Member.update(request.body, function(){
            return response.redirect(`/members/${request.body.id}`)            
        })
        
    },

    delete(request, response){
        Member.delete(request.body.id, function(){
            return response.redirect(`/members`)
        })
    },
}


// exports.index = function(request, response){
//     return response.render('members/index', {members: data.members})
// }

// //show

// exports.show = function(request, response) {
//     //request.paras.id = /:id

//     const { id } = request.params

//     const foundMember = data.members.find(function(member){
//         return member.id == id

//     })

//     if(!foundMember){
//         return response.send("Member not found!")

//     }    

//     const member = {
//         ...foundMember,
//         birth: date(foundMember.birth).birthDay       

//     }
    
    
//     return response.render("members/show", { member })


// }

// exports.create = function(request, response){
//     return response.render('members/create')
// }

// //post
// exports.post = function(request, response){ 
//     //request.query 
//     //Retorna pelo ID

//     //request.body
//     //{"avatar_url": "https://www.google.com.br/","name": "andre","birth": "1991-03-22","gender": "M","services": "teste, teste2, teste3"}

//     //keys
//     //["avatar_url","name","birth","gender","services"]
    

//     const keys = Object.keys(request.body)

//     for (key of keys){
//         if(request.body[key] =="")
//             return response.send("Please, fill all fields!")
//     }

//     birth = Date.parse(request.body.birth)

//     let id = 1
//     const lastMember = data.members[data.members.length - 1]
    
//     if(lastMember){
//         id = lastMember.id + 1
//     }


//     data.members.push({
//         id,        
//         ...request.body,
//         birth,        
//     })
    
//     fs.writeFile("data.json", JSON.stringify(data,null, 2),function(err){
//         if(err) return response.send("write File error")

//         return response.redirect('/members')
//     })
// }

// //edit 
// exports.edit = function(request, response){

//     const { id } = request.params

//     const foundMember = data.members.find(function(member){
//         return member.id == id

//     })

//     if(!foundMember){
//         return response.send("Member not found!")
//     }    

//     const member = {
//         ...foundMember,
//         birth: date(foundMember.birth).iso
//     }

//     return response.render('members/edit', { member})
// }

// //PUT

// exports.put = function(request, response) {
//     const { id } = request.body
//     let index = 0

//     const foundMember = data.members.find(function(member, foundIndex){
//         if(id == member.id){
//             index = foundIndex
//             return true
//         }

//     })

//     if(!foundMember) return response.send("Member not found!")
    
//     const member = {
//         ...foundMember,
//         ...request.body,
//         birth: Date.parse(request.body.birth),
//         id: Number(request.body.id)     
//     }

//     data.members[index] = member

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return response.send ("write error!")

//         return response.redirect(`/members/${id}`)
//     })
// }

// //delete

// exports.delete = function(request, response){
//     const { id } = request.body

//     const filteredMembers = data.members.filter(function(member){
//         return member.id != id
//     })


//     data.members = filteredMembers

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return response.send ("write error!")

//         return response.redirect('/members')
//     })
// }