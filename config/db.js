const mysql = require('mysql2/promise');


// connect to mysql
const myCreatePool=mysql.createPool(
    {

        host:'localhost',
        user:'root',
        password:'',
        database:'student_db'
    }

);

module.exports=myCreatePool;



