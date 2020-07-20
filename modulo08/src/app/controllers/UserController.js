const { hash } = require('bcryptjs')
const { unlinkSync } = require('fs')

const User = require('../models/User')
const Product = require('../models/Product')
const LoadProductsServices = require('../services/LoadProductService')

const { formatCep, formatCpfCnpj } = require('../../lib/utils')

module.exports = {
    registerForm(req, res) {
        return res.render('user/register')
    },
    async show(req, res) {
        try {
            const { user } = req

            user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
            user.cep = formatCep(user.cep)

            return res.render("user/index", { user })

        } catch (error) {
            console.error(error)
        }


    },
    async post(req, res) {
        try {
            let { name, email, password, cpf_cnpj, cep, address } = req.body
            //hash of password - criptografia
            password = await hash(password, 8)
            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            const userId = await User.create({
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                address
            })

            req.session.userId = userId

            return res.redirect('/users')

        } catch (error) {
            console.error(error)
        }


    },
    async update(req, res) {
        try {
            const { user } = req
            let { name, email, cpf_cnpj, cep, address } = req.body

            cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            cep = cep.replace(/\D/g, "")

            await User.update(user.id, {
                name,
                email,
                cpf_cnpj,
                cep,
                address
            })

            return res.render('user/index', {
                user: req.body,
                success: "Conta atualizada com sucesso!"
            })
        } catch (err) {
            console.error(err)
            return res.render('user/index', {
                error: "Algum erro ocorreu"
            })
        }
    },
    async delete(req, res) {
        try {
            //pegar os produtos
            const products = await Product.findAll({ where: { user_id: req.body.id } })

            //depois dos produtos pegar todas as imagens
            const allFilesPromise = products.map(product =>
                Product.files(product.id))

            let promiseResults = await Promise.all(allFilesPromise)

            //rodar a remoção dos usuários
            await User.delete(req.body.id)
            req.session.destroy()

            //remover todas as imagens da pasta public
            promiseResults.map(files => {
                files.map(file => {
                    try {
                        unlinkSync(file.path)
                    } catch (err) {
                        console.error(err)
                    }
                })
            })

            return res.render('session/login', {
                success: "Conta apagada com sucesso!"
            })

        } catch (err) {
            console.error(err)
            return res.render('user/index', {
                user: req.body,
                error: "Erro ao tentar apagar a conta! Tente novamente mais tarde"
            })
        }
    },
    async ads(req, res) {
        try {
            const products = await LoadProductsServices.load('products', {
                where: { user_id: req.session.userId }
            })

            return res.render('user/ads', { products })
        } catch (error) {
            console.error(error)            
        }
    }
}

//ECMAScript 6
//const, let
//template literals `strings`
//spread operators  {...objeto} - [...array]
//shorthand { a() }
//arrow function () => {}
