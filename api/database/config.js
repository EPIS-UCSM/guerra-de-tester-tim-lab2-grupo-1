//@/heroku_02c8ff1dfb06819?reconnect=true

//@ts-check
const mysql = require ('mysql2/promise');

//Production
const configProd = {
    host:"us-cdbr-east-05.cleardb.net",
    user:"b016cfe302f1bf",
    database:"heroku_02c8ff1dfb06819",
    password:"8954e594",
    multipleStatements:true
}

//Development
const config = {
    host:"localhost",
    user:"root",
    database:"inventario",
    password:"admin123",
    multipleStatements:true
}

const query = async (queryString = "select 1 + 1 ") =>{
   const connection = await mysql.createConnection(configProd);

   const [rows] = await connection.query(queryString)
   
   connection.end();
   
   return rows
}


module.exports = {
    query
} 