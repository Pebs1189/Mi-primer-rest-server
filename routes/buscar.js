const {Router} = require('express');
const { buscar } = require('../controller');

const router = new Router();

/**
 * API REST de busquedas
 */
router.get('/:coleccion/:termino', buscar);


module.exports = router;