let Sequelize = require('sequelize');
const database = require('../config')().MYSQL;

module.exports = new Sequelize(
    database.name,
    database.user,
    database.pwd,
    {
        host: database.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);