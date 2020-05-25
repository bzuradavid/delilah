const express = require('express');
const Router = express.Router();
const sequelize = require('../db_connect');

Router.get("/", async (req, res) => {
    let query = "SELECT * FROM orders";
    let result = await sequelize.query(query, { raw: true });
    res.send(result[0]);
})
Router.post("/", async (req, res) => {
    let query = "INSERT INTO orders () VALUES "
})

module.exports = Router;