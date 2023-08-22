const express = require('express');
const cors = require('cors');

const { dbConnectionFec } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.userPath = '/api/users';


        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnectionFec();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.userPath, require('../routes/users_routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running in port', this.port );
        });
    }

}




module.exports = Server;
