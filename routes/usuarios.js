const { Router } = require('express');
const { check } = require('express-validator');

const validarCampos = require('../middleware/validar-campos');
const {usuariosGet, usuariosDelete, usuariosPost, usuariosPut, usuariosPatch} = require('../controller/usuarios');
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

//validación de datos
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

//validación de datos con express-validator
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(), 
    check('correo').custom( existeEmail ),
    check('password', 'El password debe tener más de 6 letras').isLength({min:6}), 
    check('rol').custom( esRolValido ), //esRolValido es lo mismo que poner (rol) => esRolValido(rol)
    validarCampos
], usuariosPost);

router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;