

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

Router.get("/", authenticateUser, async (req, res) => {
    if (req.user.role == 'admin') {
        let query = "SELECT * FROM orders";
        let result = await sequelize.query(query, { raw: true });
        res.send(result[0]);
    } else {
        let query = `SELECT * FROM orders WHERE user_id = '${req.user.user_id}'`;
        let result = await sequelize.query(query, { raw: true });
        res.send(result[0]);
    }
})

Router.post("/", authenticateUser, async (req, res) => {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 3);
    let dateISO = currentDate.toISOString();
    let date = dateISO.split('T')[0];
    let time = dateISO.split('T')[1];
    time = time.split(".")[0];
    let datetime = date + " " + time;
    try{
        let query = `INSERT INTO orders (user_id, payment_method_id, created_time ) VALUES ('${req.user.user_id}', '${req.body.payment_method_id}', '${datetime}')`;
        let result = await sequelize.query( query, { raw: true } );
        let order_id = result[0];
        req.body.products.forEach( async (product) => {
            let query = `INSERT INTO product_order (order_id, product_id, quantity ) VALUES ('${order_id}', '${product.product_id}', '${product.quantity}')`;
            let result = await sequelize.query( query, { raw: true } );
        })
        req.body.order_id = order_id;
        res.status(200);
        res.send(req.body);
    } catch (err) {
        res.status(500);
        res.send("Ha ocurrido un error al crear el pedido")
    }
})

Router.put("/:orderId", authenticateUser, async (req, res) => {
    if (req.user.role == 'admin') {
        try {
            let query = `UPDATE orders SET status_id = ${req.body.status_id} WHERE order_id = ${req.params.orderId}`
            let result = await sequelize.query( query, { raw: true } );
            query = `SELECT * FROM orders WHERE order_id = ${req.params.orderId}`;
            result = await sequelize.query( query, { raw: true } );
            res.status(200);
            res.send(result[0])
        } catch (err) {
            res.status(500)
            res.json({error: "No se ha podido cambiar el estado del pedido"})
        } 
    } else {
        res.status(403);
        res.json({error: "Su usuario no tiene autorización para realizar esta acción"});
    }
})

module.exports = Router;