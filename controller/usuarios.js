const {response} = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        "msg":"get API - Controller"
    });
};

const usuariosPut = (req, res = response) => {
    res.json({
        "msg":"put API - Controller"
    });
};

const usuariosPost = (req, res = response) => {
    res.json({
        "msg":"post API - Controller"
    });
};

const usuariosPatch = (req, res = response) => {
    res.json({
        "msg":"patch API - Controller"
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        "msg":"delete API - Controller"
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}