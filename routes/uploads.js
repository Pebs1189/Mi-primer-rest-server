const {Router} = require('express');
const {check} = require('express-validator');

const { 
    cargarArchivo ,
    actualizarImagenCloudinary,
    mostrarImagenCloudinay
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
], mostrarImagenCloudinay);

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser válido').isMongoId(),
    check('coleccion', '').custom(c => validarColeccionesPermitidas (c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);

module.exports = router;