
const auth = require('../controller/auth');
const categorias = require('../controller/categorias');
const productos = require('../controller/productos');
const usuarios = require('../controller/usuarios');
const buscar = require('../controller/buscar');

module.exports = {
    ...auth,
    ...categorias,
    ...productos,
    ...usuarios,
    ...buscar
}