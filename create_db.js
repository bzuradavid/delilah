const Sequelize = require('sequelize') ;

const sequelize = new Sequelize("", "root", "root", {
    dialect: "mysql"
});
  
sequelize.authenticate().then(async () => {
    let query;
    let result;
    query = "DROP DATABASE delilah";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE DATABASE delilah";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.pedidos ( id_pedido INT PRIMARY KEY AUTO_INCREMENT , id_usuario INT NOT NULL , id_estado INT NOT NULL , id_medio INT NOT NULL , fecha DATE NOT NULL )";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.usuarios ( id_usuario INT PRIMARY KEY AUTO_INCREMENT , alias VARCHAR(50) NOT NULL , nombre VARCHAR(50) NOT NULL , email VARCHAR(100) NOT NULL , telefono VARCHAR(100) NOT NULL , direccion VARCHAR(150) NOT NULL , clave VARCHAR(20) NOT NULL )";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.productos ( id_producto INT PRIMARY KEY AUTO_INCREMENT , descripcion VARCHAR(50) NOT NULL , precio DECIMAL(11,2) NOT NULL )";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.producto_pedido ( id INT PRIMARY KEY AUTO_INCREMENT , id_producto INT NOT NULL , id_pedido INT NOT NULL , cantidad INT NOT NULL )"
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.estados ( id_estado INT PRIMARY KEY AUTO_INCREMENT , descripcion VARCHAR(50) )"; 
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.medios ( id_medio INT PRIMARY KEY AUTO_INCREMENT , descripcion VARCHAR(50) )";
    result = await sequelize.query(query, { raw: true });

});
