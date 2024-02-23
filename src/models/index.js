const dbconfig = require('../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.changeUser, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect ,
    operatorsAliases: false,

    pool:{
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
})

const db = {};

db.Sequelize = Sequelize;
db.Sequelize = Sequelize;

db.images = require("./image.model.js")(sequelize,Sequelize)