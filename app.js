const Server = require('./models/server');

require('dotenv').config({path:'./.env'});

const server = new Server();

//Se inicializa la appweb y se pone a escuchar por el puerto
server.listen();