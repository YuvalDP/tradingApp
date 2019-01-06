var mysql = require('mysql');
const HOSTNAME = process.env.HOST_NAME;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;
var pool  = mysql.createPool({
    connectionLimit : 20,
    host            : HOSTNAME,
    user            : USER,
    password        : PASSWORD,
    database        : DATABASE
});

module.exports = pool;