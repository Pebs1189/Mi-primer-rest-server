
const auth = require('../controller/auth');
const categorias = require('../controller/categorias');
const productos = require('../controller/productos');
const usuarios = require('../controller/usuarios');
const buscar = require('../controller/buscar');
const uploads = require('../controller/uploads');

module.exports = {
    ...auth,
    ...categorias,
    ...productos,
    ...usuarios,
    ...buscar,
    ...uploads
}