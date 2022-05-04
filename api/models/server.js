//@ts-check
const express = require('express')
const cors = require('cors');
const routerAuth = require('../routes/auth');
const routerUsers = require('../routes/users');


class Server{
    
    app;
    port;
    userPaths;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';
        this.indexPath = '/api';

        //Middlewares
        this.middlewares();
        
        //Routes
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use( cors() )

        this.app.use( express.json() )
        
        //Public folder
        this.app.use(express.static( "public" ))
        
    }

    routes(){
        this.app.get(this.indexPath, (req,res)=>{
            res.json({msg:"Api - conected!"})
        })
        this.app.use(this.userPaths, routerUsers);
        this.app.use(this.authPath , routerAuth );
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        })
    }
}

module.exports = Server;