
const auth = require('../controller/auth');
const categorias = require('../controller/categorias');
const productos = require('../controller/productos');
const usuarios = require('../controller/usuarios');

module.exports = {
    ...auth,
    ...categorias,
    ...productos,
    ...usuarios
}