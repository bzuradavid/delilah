const Sequelize = require('sequelize') ;

const sequelize = new Sequelize("", "root", "root", {
    dialect: "mysql"
});

let drop_db = true;
  
sequelize.authenticate().then(async () => {

    let query, result;

    if(drop_db){
        query = "DROP DATABASE delilah";
        result = await sequelize.query(query, { raw: true });
    }

    query = "CREATE DATABASE delilah";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.orders ( order_id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL , status_id INT NOT NULL DEFAULT '0' , payment_method_id INT NOT NULL DEFAULT '0' , created_date DATETIME NOT NULL )";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.users ( user_id INT PRIMARY KEY AUTO_INCREMENT , full_name VARCHAR(50) NOT NULL , email VARCHAR(100) NOT NULL , phone VARCHAR(100) NOT NULL , full_address VARCHAR(150) NOT NULL , password VARCHAR(20) NOT NULL , role VARCHAR(20) NOT NULL DEFAULT 'user' )";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.products ( product_id INT PRIMARY KEY AUTO_INCREMENT , title VARCHAR(50) NOT NULL , price DECIMAL(11,2) NOT NULL )";
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.product_order ( id INT PRIMARY KEY AUTO_INCREMENT , product_id INT NOT NULL , order_id INT NOT NULL , quantity INT NOT NULL )"
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.statuses ( status_id INT PRIMARY KEY AUTO_INCREMENT , title VARCHAR(50) )"; 
    result = await sequelize.query(query, { raw: true });
    query = "CREATE TABLE delilah.payment_methods ( payment_method_id INT PRIMARY KEY AUTO_INCREMENT , title VARCHAR(50) )";
    result = await sequelize.query(query, { raw: true });
    
    query = "INSERT INTO delilah.users (full_name, email, phone, full_address, password, role) VALUES ( 'Super admin', 'admin@delilah.com', '3515555555', 'Av. Siempreviva 576', '1234', 'admin' )";
    result = await sequelize.query(query, { raw: true });

});
