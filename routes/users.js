const express = require('express');
const Router = express.Router();
const sequelize = require('../db_connect')

Router.get("/", async (req, res) => {
    let query = "SELECT * FROM users";
    let result = await sequelize.query(query, { raw: true });
    res.send(result[0]);
})

module.exports = Router;