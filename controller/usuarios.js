const {response} = require('express');

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

const usuariosPost = (req, res = response) => {
    const {nombre, edad} = req.body;

    res.json({
        msg:'post API - Controller',
        nombre,
        edad
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