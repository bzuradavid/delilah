const Sequelize = require('sequelize');

const sequelize = new Sequelize("delilah", "root", "root", {
    dialect: "mysql"
});

module.exports = sequelize;