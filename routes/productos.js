const { Router, response } = require('express');
const { check } = require('express-validator');

const {
    postProducto,
    getProductos,
    putProducto,
    deleteProducto
} = require('../controller');

const { existeCategoriaPorID, existeProductoPorID} = require('../helpers/db-validators');

const {
    validarCampos, 
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../middleware')

const router = Router();

/**
 * CRUD Producto
 */

//obtener todas las categorias - paginado - total 
router.get('/', getProductos);

//obtener una categoria por id - populate
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id', 'El producto no existe').custom( existeProductoPorID ),
    validarCampos
], getProductos);

//Crear categoria - privado - cualquier persona con un token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es una categoría válida').isMongoId(),
    check('categoria', 'La categoría no existe').custom( existeCategoriaPorID),
    validarCampos
], postProducto );

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id', 'El producto no existe').custom( existeProductoPorID ),
    check('categoria', 'No es una categoría válida').isMongoId(),
    check('categoria', 'La categoría no existe').custom( existeCategoriaPorID),
    validarCampos
], putProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE', 'USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id', 'El producto no existe').custom( existeProductoPorID ),
    validarCampos
],  deleteProducto );


module.exports = router;