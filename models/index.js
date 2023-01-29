const Sequelize = require('sequelize');
const { user } = require('./user');
const dbConfig = require("../config/db.config");
const { shop } = require('./shop');
const { file } = require('./file');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize, Sequelize);
db.shop = shop(sequelize, Sequelize);
db.file = file(sequelize, Sequelize);
// db.party = party(sequelize, Sequelize);

module.exports = db;