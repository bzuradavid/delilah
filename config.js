require('dotenv').config()

module.exports= {
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.PORT || '3306',
        user: process.env.USER || 'root',
        pass: process.env.PASS || 'root',
        db_name: process.env.DB_NAME || 'delilah',
        dialect: process.env.DIALECT || 'mysql'
    }
}