const User = require('../models/User')
const { compare } = require('bcryptjs')

function checkAllFields(body){
    const keys = Object.keys(body)
    for(key of keys){
        if(body[key] == ""){
            return{
                user: body,
                error: "Por Favor, preencha todos os campos!"
            }
        }
    }
}

async function show(req,res, next) {
    const { userId: id } = req.session

        const user = await User.findOne({ where: { id }})

        if(!user) return res.render("user/register", {
            error: "Usuário não encontrado!"
        })
    req.user = user

    next()

}
async function post(req, res, next){
    //check if has all fields
    const fillAllfields = checkAllFields(req.body)
    if(fillAllfields){
        return res.render("user/register", fillAllfields)
    }

    //check if user exists [email, cpf_cnpj]
    let { email, cpf_cnpj, password, passwordRepeat } = req.body

    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")

    const user = await User.findOne({
        where:{ email },
        or: { cpf_cnpj }
    })

    if(user) return res.render('user/register', {
        user: req.body,
        error: 'Usuário já cadastrado.'
    })
    
    //check if password match
    if(password != passwordRepeat){
        return res.render('user/register', {
            user: req.body,
            error: 'Senha não confere.'
        })
    }
    next()
}
async function update(req, res, next){
    // all fields
    const fillAllfields = checkAllFields(req.body)
    if(fillAllfields){
        return res.render("user/index", fillAllfields)
    }
    
    //has password
    const {id, password } = req.body
    
    if(!password){
        return res.render('user/index',{
            user: req.body,
            error: "Informe sua senha para atualizar o cadastro."
        })
    }

    const user = await User.findOne({ where: {id} })
    
    //has password match
    const passed = await compare(password, user.password)

    if(!passed) {
        return res.render('user/index',{
            user: req.body,
            error: "Senha Incorreta!"
        })
    }

    req.user = user
    next()
}

module.exports = {
    checkAllFields,
    post,
    show,
    update,
}