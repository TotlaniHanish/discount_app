module.exports = {

    HOST: "localhost",

    USER: "allego",

    PASSWORD: "allego",

    DB: "discount_app",

    dialect: "mysql",

    pool: {

        max: 5,

        min: 0,

        acquire: 30000,

        idle: 10000,
        maxConnections: 50,
        maxIdleTime: 30

    }

};