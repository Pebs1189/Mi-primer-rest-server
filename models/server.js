const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        //Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                "msg":"get API"
            });
        });
        
        this.app.put('/api', (req, res) => {
            res.json({
                "msg":"put API"
            });
        });
        
        this.app.post('/api', (req, res) => {
            res.json({
                "msg":"post API"
            });
        });
        
        this.app.delete('/api', (req, res) => {
            res.json({
                "msg":"delete API"
            });
        });
        
        this.app.patch('/api', (req, res) => {
            res.json({
                "msg":"patch API"
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor escuchando en el puerto ${this.port}`);
        });
    }

    middlewares() {
        this.app.use( cors() );
        this.app.use(express.static('public', {extensions:'html'}));
    }
}

module.exports = Server;