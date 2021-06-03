const {Router} = require('express');
const {check} = require('express-validator');

const { 
    cargarArchivo 
} = require('../controller');

const {
    validarCampos
} = require('../middleware');



const router = new Router();


/** CRUD cargar archivos */
router.post('/', cargarArchivo);


module.exports = router;