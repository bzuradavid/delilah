const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db_connect');
const ProductRoutes = require('./routes/products'); 

var app = express();
app.use(bodyParser.json());
app.use("/products", ProductRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
  
app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('error');
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
 