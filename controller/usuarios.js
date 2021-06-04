const {response} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req, res = response) => {
    // const {q, nombre, apikey} = req.query;
    const {limit=5, desde=0} = req.query;
    const query = {estado:true};
   
    //paginación de resultados, se usa Promise.all para mejorar el rendimiento
    try {
        const resp = await Promise.all([
            Usuario.countDocuments(query),
            Usuario.find(query)
                .limit(Number(limit))
                .skip(Number(desde))
        ]);
    
        //destructuración de arreglos
        const [total, usuarios] = resp;
    
        res.json({
            total,
            usuarios
        });
    } catch (error) {
        console.log(error);
    }

};

const usuariosPut = async (req, res = response) => {
    const {id} = req.params;
    const {uid, password, google, ...resto} = req.body;

    if (password) {
        //encriptar password
        const salt = bcryptjs.genSaltSync(); //10 por defecto
        resto.password = bcryptjs.hashSync(password, salt);
    }
    
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, resto);

        res.json({usuario});
    } catch (error) {
        console.log(error);
    }
};

const usuariosPost = async (req, res = response) => {
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //encriptar password
    const salt = bcryptjs.genSaltSync(); //10 por defecto
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en DB
    try {
        await usuario.save();

        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
    }
};

const usuariosPatch = (req, res = response) => {

    res.json({
        msg: 'Patch Api - mensaje'
    });
};

const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id);
    try {
        const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    
        const usuarioAutenticado = req.usuario;
    
        res.json(usuario);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}