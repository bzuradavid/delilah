

const express = require('express')
const Router = express.Router()
const sequelize = require('../db_connect')
const jwt = require('jsonwebtoken')

Router.post("/login", async (req, res) => {
    try {
        let query = `SELECT * FROM users WHERE email = '${req.body.email}'`
        let result = await sequelize.query(query, { raw: true })
        if(req.body.password == result[0][0].password){
            let user_id = result[0][0].user_id
            let email = result[0][0].email
            let role = result[0][0].role
            const secreto = 'delilah'
            const token = jwt.sign({
                user_id: user_id,
                email: email,
                role: role
            }, secreto)
            let response = { token: token }
            res.status(200)
            res.send(response)
        } else {
            res.status(401)
            res.send("Email o contraseña incorrectos")
        }
    } catch(err) {
        console.log(err)
        res.status(500)
        res.send("Ha ocurrido un error al procesar la solicitud")
    }
})

module.exports = Router;
