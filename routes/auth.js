const {Router} = require('express');
const {check} = require('express-validator');
const { login, googleSignin } = require('../controller/auth');
const validarCampos = require('../middleware/validar-campos');

const router = new Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

router.post('/google', [
    check('id_token', 'El id token es necesario').not().isEmpty(),
    validarCampos
], googleSignin );

module.exports = router;