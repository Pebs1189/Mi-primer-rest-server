const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users:'/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        };

        //Conectar a MongoDBs
        this.conectarDB();

        //Middlewares
        this.middlewares();
        
        //Rutas de mi aplicacion
        this.routes();
    }

    routes() {
       this.app.use(this.paths.auth, require('../routes/auth'));
       this.app.use(this.paths.categorias, require('../routes/categorias'));
       this.app.use(this.paths.users, require('../routes/usuarios'));
       this.app.use(this.paths.productos, require('../routes/productos'));
       this.app.use(this.paths.buscar, require('../routes/buscar'));
       this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public', {extensions:'html'}));

        //FileUpload - Carga de archivos 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }
}

module.exports = Server;