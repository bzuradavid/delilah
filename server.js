const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db_connect');
const ProductRoutes = require('./routes/products'); 
const jwt = require('jsonwebtoken');

var app = express();
app.use(bodyParser.json());
app.use("/products", ProductRoutes);

app.post("/login", async (req, res) => {
    let query = `SELECT * FROM users WHERE email = '${req.body.email}'`
    try{
        let result = await sequelize.query(query, { raw: true });
        if(req.body.password == result[0][0].password){
            let role = result[0][0].role
            const secreto = 'delilah';
            const token = jwt.sign({
                role: role,
            }, secreto);
            let response = { token: token }
            res.status(200)
            res.send(response)
        } else {
            res.status(403)
            res.send("Email o contraseña incorrectos")
        }
    } catch(err) {
        console.log(err);
        res.status(500)
        res.send("Ha ocurrido un error al procesar la solicitud")
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
 