const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db_connect');
const LoginRoutes = require('./routes/login');
const ProductRoutes = require('./routes/products'); 
const jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.json());
app.use("/", LoginRoutes);
app.use("/products", ProductRoutes);

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
 