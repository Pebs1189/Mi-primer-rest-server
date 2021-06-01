const { Router, response } = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT} = require('../middleware')
const crearCategoria = require('../controller/categorias')

const router = Router();

/*
* {{url}}/api/categorias
*/

//obtener todas las categorias
router.get('/', (req, res = response) => {
    res.json({msg:'get'});
});

//obtener una categoria por id - publico
router.get('/', (req, res = response) => {
    res.json({msg:'get'});
});

//Crear categoria - privado - cualquier persona con un token válido
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),    
    validarCampos
], crearCategoria);

//Actualizar - privado - cualquiera con token válido
router.put('/:id', (req, res = response) => {
    res.json({msg:'put'});
});

//Borrar una categoria - Admin (estado a false)
router.delete('/:id', (req, res = response) => {
    res.json({msg:'delete'});
});






module.exports = router;