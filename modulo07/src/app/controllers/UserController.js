const User = require('../models/User')
module.exports = {
    registerForm(req, res){
        return res.render('user/register')
    },
    show(req, res){
        return res.send("ok, cadastrado")
    },
    async post(req,res){

        const userId = await User.create(req.body)

        return res.redirect('/users')
    },
}



//ECMAScript 6
//const, let
//template literals `strings`
//spread operators  {...objeto} - [...array]
//shorthand { a() }
//arrow function () => {}

