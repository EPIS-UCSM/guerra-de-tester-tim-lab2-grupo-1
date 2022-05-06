//@ts-check
const mysql = require ('mysql2/promise');

//Development
const config = {
    host:"localhost",
    user:"root",
    database:"inventario",
    password:"admin123",
    multipleStatements:true
}

const query = async (queryString = "select 1 + 1 ") =>{
   const connection = await mysql.createConnection(config);

   const [rows] = await connection.query(queryString)
   
   connection.end();
   
   return rows
}


module.exports = {
    query
} 