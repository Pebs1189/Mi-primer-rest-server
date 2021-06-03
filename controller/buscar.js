const { response } = require("express");
const {ObjectId} = require('mongoose').Types;

const {Usuario, Producto, Categoria} = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
];

const buscarUsuarios = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        res.json({
            results:  (usuario) ? [usuario] : []
        });
    } else {

        const regex = new RegExp(termino, 'i');

        const usuarios = await Usuario.find({
            $or: [{nombre: regex}, {correo: regex}],
            $and: [{estado: true}]
        });
        
        res.json({
            results:  usuarios
        });
    }

};

const buscarProductos = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //se comprueba si es un id de mongo

    if (esMongoID) { // si es un Id de mongo buscamos por id sino buscamos por nombre
        const producto = await Producto.findById(termino)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        
        res.json({
            results:  (producto) ? [producto] : []
        });
    } else {

        const regex = new RegExp(termino, 'i');

        const producto = await Producto.find({nombre: regex, estado: true})
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        
        res.json({
            results:  producto
        });
    }
};

const buscarCategoria = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino); //se comprueba si es un id de mongo

    if (esMongoID) { // si es un Id de mongo buscamos por id sino buscamos por nombre
        const categoria = await Categoria.findById(termino) 
            .populate('usuario', 'nombre');
        
        res.json({
            results:  (categoria) ? [categoria] : []
        });
    } else {

        const regex = new RegExp(termino, 'i');

        const categoria = await Categoria.find({nombre: regex, estado: true})
            .populate('usuario', 'nombre');
        
        res.json({
            results:  categoria
        });
    }
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
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
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