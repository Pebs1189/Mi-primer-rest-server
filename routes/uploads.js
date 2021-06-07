const {Router} = require('express');
const {check} = require('express-validator');

const { 
    cargarArchivo ,
    actualizarImagen,
    mostrarImagen
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
router.get('/:coleccion/:id', [
    check('id','El id debe ser válido').isMongoId(),
    check('coleccion', '').custom(c => validarColeccionesPermitidas (c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser válido').isMongoId(),
    check('coleccion', '').custom(c => validarColeccionesPermitidas (c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

module.exports = router;