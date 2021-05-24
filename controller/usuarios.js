const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req, res = response) => {
    const {q, nombre, apikey} = req.query;

    res.json({
        msg:'get API - Controller',
        q,
        nombre,
        apikey
    });
};

const usuariosPut = (req, res = response) => {
    const {id} = req.params;

    res.json({
        msg:'put API - Controller',
        id
    });
};

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //verificar si el correo existe: express-validator
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) return res.status(400).json({msg:'El correo ya está registrado'});

    //encriptar password
    const salt = bcryptjs.genSaltSync(); //10 por defecto
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en DB
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'patch API - Controller'
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controller'
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}