const { response } = require("express");
const { Categoria } = require('../models');

/*
* categoriasGET:
* {{url}}/api/categoria/ --> return todas las categorias con estado a true (máx: 10)
* {{url}}/api/categoria/id --> return la categoria con el id correspondiente y el usuario que lo creó
*/
const categoriasGet = async (req, res = response) => {
    const {limit=10, desde=0} = req.query;
    const query = {estado:true};
    const {id} = req.params;
    let data = {};

    if (id) {
        //populate: usa la ref del schema para obtener el objeto referido
        const {_id, nombre, estado, usuario} = await Categoria.findById(id)
            .populate('usuario');

        data = {id:_id, nombre, estado, usuario};
    } else {
        //paginacion de resiltado
        const resp = await Promise.all([
            Categoria.countDocuments(query), //total categorias
            Categoria.find(query)            //resultado de la busqueda
                .limit(Number(limit))        //max resultado a mostrar
                .skip(Number(desde))         //muestra a partir del resultado x 
        ]);

        //destructuración de arreglos [total de registros, resultado de la busqueda]
        const [total, categorias] = resp;

        data = {
            total,
            categorias
        };
    }

    res.json(data);
};

const crearCategoria = async (req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});
    
    if (categoriaDB) {
        return res.status(400).json({msg: `La categoria ${categoriaDB.nombre}, ya existe`});
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    };

    //crear la cateogría
    const categoria = await new Categoria(data);
    //guardar en DB
    await categoria.save();

    res.status(201).json(categoria);
};

const categoriasPut = async (req, res = response) => {
    res.json({msg:'put'});
};

const categoriasDelete = async (req, res = responde) => {
    res.json({msg:'delete'});
};

module.exports = {
    crearCategoria,
    categoriasGet,
    categoriasPut,
    categoriasDelete
};