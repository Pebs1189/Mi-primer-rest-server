const {Router} = require('express');
const {check} = require('express-validator');

const { 
    cargarArchivo ,
    actualizarImagen
} = require('../controller');

const {
    validarCampos,
    validarArchivoSubir
} = require('../middleware');

const {
    validarColeccionesPermitidas
} = require('../helpers');



const router = new Router();


/** CRUD cargar archivos */
router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser válido').isMongoId(),
    check('coleccion', '').custom(c => validarColeccionesPermitidas (c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

module.exports = router;