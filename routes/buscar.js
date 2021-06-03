const {Router} = require('express');
const { buscar } = require('../controller');

const router = new Router();

/**
 * Ruta de busquedas
 */
router.get('/:coleccion/:termino', buscar);


module.exports = router;