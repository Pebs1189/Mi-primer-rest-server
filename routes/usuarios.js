const { Router } = require('express');
const { check } = require('express-validator');

const validarCampos = require('../middleware/validar-campos');
const {usuariosGet, usuariosDelete, usuariosPost, usuariosPut, usuariosPatch} = require('../controller/usuarios');
const { esRolValido } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', usuariosPut);

//validación de datos con express-validator
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(), 
    check('password', 'El password debe tener más de 6 letras').isLength({min:6}), 
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;