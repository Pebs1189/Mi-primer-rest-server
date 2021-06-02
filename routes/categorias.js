const { Router, response } = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT} = require('../middleware')
const {
    crearCategoria, 
    categoriasDelete,
    categoriasGet, 
    categoriasPut
} = require('../controller/categorias');

const {existeCategoriaPorID} = require('../helpers/db-validators');

const router = Router();

/*
* {{url}}/api/categorias
*/

//obtener todas las categorias - paginado - total - populate 
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

], categoriasPut );

//Borrar una categoria - Admin (estado a false)
router.delete('/:id',[

], categoriasDelete );






module.exports = router;