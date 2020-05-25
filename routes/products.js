const express = require('express');
const Router = express.Router();
const sequelize = require('../db_connect');
const jwt = require('jsonwebtoken');

Router.get("/", async (req, res) => {
    let query = "SELECT * FROM products";
    let result = await sequelize.query(query, { raw: true });
    res.send(result[0]);
})

Router.get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    let query = `SELECT * FROM products WHERE product_id = ${productId}`;
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

Router.put("/", async (req, res) => {
    let query = `UPDATE products SET title = '${req.body.title}', price = '${req.body.price}' WHERE product_id = ${req.body.product_id}`;
    try{
        let result = await sequelize.query(query, { raw: true });
        res.status(res.statusCode);
        res.send(req.body);
    }catch(err){
        console.log(err);
    }
})

module.exports = Router;