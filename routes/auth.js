const {Router} = require('express');
const {check} = require('express-validator');
const { login } = require('../controller/auth');
const validarCampos = require('../middleware/validar-campos');

const router = new Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login );

module.exports = router;