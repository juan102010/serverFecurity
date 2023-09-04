const express = require('express');
const cors = require('cors');

const { dbConnectionSec } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.authPath             = '/api/auth';
        this.rolPath              = '/api/rol';
        this.rolByUserPath        = '/api/rolByUser';
        this.companyReportPath    = '/api/companyReport';

        // Conectar a base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async connectDB() {
        await dbConnectionSec();
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
        
        this.app.use( this.authPath, require('../routes/auth'));
        this.app.use( this.rolPath, require('../routes/rol'));
        this.app.use( this.rolByUserPath, require('../routes/rolbyuser'));
        this.app.use( this.companyReportPath, require('../routes/companyreport'));
       
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running in port', this.port );
        });
    }

}




module.exports = Server;
