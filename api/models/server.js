//@ts-check
const express = require('express')
const cors = require('cors');
const routerAuth = require('../routes/auth');
const routerUsers = require('../routes/users');
const routerProducts = require('../routes/products');
const routerSuppliers = require('../routes/supplier');
const routerAlmacenes = require('../routes/almacen');


class Server{
    
    app;
    port;
    userPaths;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.userPaths = '/api/usuarios';
        this.authPath = '/api/auth';
        this.productsPath = '/api/productos';
        this.proveedoresPath = '/api/proveedores';
        this.almacenesPath = '/api/almacenes';
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
        this.app.use(this.productsPath , routerProducts );
        this.app.use(this.proveedoresPath , routerSuppliers );
        this.app.use(this.almacenesPath , routerAlmacenes );
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${ this.port }`);
        })
    }
}

module.exports = Server;