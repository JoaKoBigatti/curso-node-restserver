const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port=process.env.PORT
        this.usuariosRoutePath='/api/usuarios';
        //Middlewares (funciones que añaden otra funcionalidad al server)
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosRoutePath,require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en puerto http://localhost:${this.port}`);
        });
    }
}

module.exports=Server;