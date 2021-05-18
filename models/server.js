const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    // noinspection JSIgnoredPromiseFromCall
    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.usuarioPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuarioPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port);
        });
    }
}

module.exports = Server;
