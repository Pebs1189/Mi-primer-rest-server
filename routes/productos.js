const { Router, response } = require('express');
const { check } = require('express-validator');

const {
    postProducto,
    getProductos
} = require('../controller');

const { existeCategoriaPorID } = require('../helpers/db-validators');

const {
    validarCampos, 
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../middleware')



const router = Router();

//obtener todas las categorias - paginado - total 
router.get('/', getProductos);

//obtener una categoria por id - populate
router.get('/:id', [

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

router.put('/', (req, res = response) => {
    res.json({msg:'Put Producto'})
} );

router.delete('/', (req, res = response) => {
    res.json({msg:'delete Producto'})
} );


module.exports = router;