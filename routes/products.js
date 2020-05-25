const express = require('express');
const Router = express.Router();
const sequelize = require('../db_connect')

Router.get("/", async (req, res) => {
    let query = "SELECT * FROM products";
    let result = await sequelize.query(query, { raw: true });
    res.send(result[0]);
})
Router.post("/", async (req, res) => {
    let query = `INSERT INTO products (title, price) VALUES ('${req.body.title}', '${req.body.price}')`;
    try{
        let result = await sequelize.query(query, { raw: true });
        req.body.product_id = result[0];
        res.status(res.statusCode);
        res.send(req.body);
    }catch(err){
        console.log(err);
    }
})

module.exports = Router;