const env = require('./config');

const { host, port, user, pass, db_name, dialect } = env.database;

const Sequelize = require( 'sequelize' );
const sequelize = new Sequelize( db_name, user, pass, { dialect: dialect } );

module.exports = sequelize;