var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '68.178.145.72',
    port: 3306,
    user: 'jgTransBackendDev',
    password: 'Dev@1234',
    database: 'jgtrans-db'
});
connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected!:)');
    }
});
module.exports = connection;