const { Router } = require('express');

const {usuariosGet, usuariosDelete, usuariosPost, usuariosPut, usuariosPatch} = require('../controller/usuarios');

const router = Router();

router.get('/', usuariosGet);
router.put('/', usuariosPut);
router.post('/', usuariosPost);
router.delete('/', usuariosDelete);
router.put('/', usuariosPatch);

module.exports = Router;