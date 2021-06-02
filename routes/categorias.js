const { Router, response } = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, esAdminRol, tieneRol} = require('../middleware')
const {
    crearCategoria, 
    categoriasDelete,
    categoriasGet, 
    categoriasPut
} = require('../controller/categorias');

const {existeCategoriaPorID} = require('../helpers/db-validators');

const router = Router();

//obtener todas las categorias - paginado - total 
router.get('/', categoriasGet );

//obtener una categoria por id - populate
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
], categoriasGet );

//Crear categoria - privado - cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    
    validarCampos
], crearCategoria);

//Actualizar categoria - privado - cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
], categoriasPut );

//Borrar una categoria - Admin (estado a false)
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoriaPorID ),
    validarCampos
], categoriasDelete );


module.exports = router;