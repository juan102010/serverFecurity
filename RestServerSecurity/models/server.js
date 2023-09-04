const express = require('express');
const cors = require('cors');

const { dbConnectionSec } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:           '/api/auth',
            rol:            '/api/rol',
            rolByUser:      '/api/rolByUser',
            companyReport:  '/api/companyReport',
            application:    '/api/application',
            company:        '/api/company',
            modules:        '/api/module',
            functionality:  '/api/functionality'
           
        }

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
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.rol, require('../routes/rol'));
        this.app.use( this.paths.rolByUser, require('../routes/rolbyuser'));
        this.app.use( this.paths.companyReport, require('../routes/companyreport'));
        this.app.use( this.paths.application, require('../routes/application'));
        this.app.use( this.paths.company, require('../routes/company'));
        this.app.use( this.paths.modules, require('../routes/module'));
        this.app.use( this.paths.functionality, require('../routes/functionality'));
       
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running in port', this.port );
        });
    }

}




module.exports = Server;
