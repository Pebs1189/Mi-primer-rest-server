const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");


const validarJWT = async (req, res = response, next) => {
    const token = req.header('x-token');
    const secret_key = process.env.SECRET_KEY;

    if (!token) {
        return res.status(401).json({msg:'No hay token en la petición'});
    }

    try {
        //si el verify no es valido, este lanzara un throw y el catch lo pilla
        const {uid} = jwt.verify(token, secret_key);

        const usuario = await Usuario.findById(uid);

        req.usuario = usuario;

        next();
    } catch (error) {
        return res.status(401).json(error);
    }
};

module.exports = {
    validarJWT
}