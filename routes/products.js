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
        res.json({error: "Error al validar usuario"})
    }
}

Router.get("/", async (req, res) => {
    let query = "SELECT * FROM products";
    let result = await sequelize.query(query, { raw: true });
    res.send(result[0]);
})

Router.get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    let query = `SELECT * FROM products WHERE product_id = ${productId}`;
    try{
        let result = await sequelize.query(query, { raw: true });
        if(result[0].length > 0) {
            res.send(result[0]);
        } else {
            res.status(404);
            res.send("No se ha encontrado un producto con el ID especificado")
        }
    }catch{
        res.status(500);
        res.send("Ha ocurrido un error en el servidor")
    }
    
})

Router.post("/", authenticateUser, async (req, res) => {
    if (req.user.role == "admin") {
        let query = `INSERT INTO products (title, price) VALUES ('${req.body.title}', '${req.body.price}')`;
        try{
            let result = await sequelize.query( query, { raw: true } );
            req.body.product_id = result[0];
            res.status(200);
            res.send(req.body);
        } catch (err) {
            res.status(500);
            res.send("Ha ocurrido un error al crear el producto")
        }
    } else {
        res.status(403)
        res.send("Usted no está autorizado a realizar esta acción")
    }
})

Router.put("/", authenticateUser, async (req, res) => {
    if (req.user.role == "admin") {
        let query = `UPDATE products SET title = '${req.body.title}', price = '${req.body.price}' WHERE product_id = ${req.body.product_id}`;
        try {
            let result = await sequelize.query(query, { raw: true });
            res.status(200);
            res.send(req.body);
        } catch (err) {
            res.status(500);
            res.send("Ha ocurrido un error al actualizar el producto")
        }
    } else {
        res.status(403)
        res.send("Usted no está autorizado a realizar esta acción")
    }
})

Router.delete("/:productId", authenticateUser, async (req, res) => {
    if(req.user.role == "admin"){
        let query = `SELECT * FROM products WHERE product_id = ${req.params.productId}`
        let result = await sequelize.query(query, { raw: true });
        if ( result[0].length > 0 ) {
            let query = `DELETE FROM products WHERE product_id = ${req.params.productId}`
            try{
                let result = await sequelize.query(query, { raw: true });
                res.status(200);
                res.send("El producto ha sido eliminado");
            }catch(err){
                res.status(500);
                res.send("Ha ocurrido un error al eliminar el producto")
            }
        } else {
            res.status(404);
            res.send("El ID indicado no corresponde a un producto existente")
        }
    } else {
        res.status(403)
        res.send("Usted no está autorizado a realizar esta acción")
    }
    
})

module.exports = Router;