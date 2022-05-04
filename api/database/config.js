//@ts-check
const mysql = require ('mysql2/promise');

//Development
const config = {
    host:"localhost",
    user:"root",
    database:"inventario",
    password:"admin123"
}

const query = async (queryString = "select 1 + 1 ") =>{
   const connection = await mysql.createConnection(config);
   
   if(connection) console.log("Data base connected");

   const [rows] = await connection.execute(queryString)
   
   connection.end();
   
   return rows
}

module.exports = {
    query
} 