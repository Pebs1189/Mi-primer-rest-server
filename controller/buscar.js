const { response } = require("express");
const {ObjectId} = require('mongoose').Types;

const {Usuario} = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
];

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(temrino);
        res.json({
            results:  (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });
    
    res.json({
        results:  usuarios
    });

};

const buscar = async (req, res = response) => {
    const {coleccion, termino} = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `La coleccion ${coleccion} no está permitida}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categorias':
            
            break;
        case 'productos':
            
            break;
        case 'roles':
            
            break;
    
        default:
            res.status(500).json({msg:'Se le olvido hacer esta busqueda'});
            break;
    }
};



module.exports = {
    buscar
};