const Server = require('./models/server');
const server = new Server();

//Se inicializa la appweb y se pone a escuchar por el puerto
server.listen();