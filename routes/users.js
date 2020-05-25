

const express = require('express');
const Router = express.Router();
const sequelize = require('../db_connect');
const jwt = require('jsonwebtoken');


const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, 'delilah');
        if (verifyToken) {
            req.user = verifyToken;
            return next();
        }
    } catch (err) {
        res.json({error: "Error al validar usuario"});
    }
}

Router.get('/', authenticateUser, async (req, res) => {
    if (req.user.role == 'admin') {
        let query = "SELECT * FROM users";
        let result = await sequelize.query(query, { raw: true });
        res.status(200);
        res.send(result[0]);
    } else {
        let query = `SELECT * FROM users WHERE email = ${req.user.email}`;
        let result = await sequelize.query(query, { raw: true });
        res.send(result[0]);
    }
})

Router.post('/', async (req, res) => {
    let query = `INSERT INTO users (full_name, email, phone, full_address, password) VALUES ('${req.body.full_name}', '${req.body.email}', '${req.body.phone}', '${req.body.full_address}', '${req.body.password}')`;
    try{
        let result = await sequelize.query( query, { raw: true } );
        req.body.user_id = result[0];
        res.status(200);
        res.send(req.body);
    } catch (err) {
        res.status(500);
        res.send("Ha ocurrido un error al crear el usuario");
    }
})

module.exports = Router;