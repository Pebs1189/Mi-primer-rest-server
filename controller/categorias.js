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
        try {
            const {_id, nombre, estado, usuario} = await Categoria.findById(id)
            .populate('usuario');

            data = {id:_id, nombre, estado, usuario};
        } catch (error) {
            res.status(400).json({msg:error});
        }
    } else {
        //paginacion de resiltado
        try {
            const resp = await Promise.all([
                Categoria.countDocuments(query), //total categorias
                Categoria.find(query)            //resultado de la busqueda
                    .limit(Number(limit))        //max resultado a mostrar
                    .skip(Number(desde))         //muestra a partir del resultado x 
                    .populate('usuario','nombre')
            ]);
    
            //destructuración de arreglos [total de registros, resultado de la busqueda]
            const [total, categorias] = resp;
    
            data = {
                total,
                categorias
            };
        } catch (error) {
            res.status(400).json({msg:error});
        }
    }

    res.json(data);
};

/*
* crearCategoria:
* {{url}}api/categorias --> return error status 400 si la categoría ya existe
* headers --> x-token (usuario atutenticado)
* body --> {"nombre":"nuevoNombre"}
*/
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
    try {
        const categoria = await new Categoria(data);
        //guardar en DB
        await categoria.save();
    
        res.status(201).json(categoria);
    } catch (error) {
        res.status(400).json({msg:error});
    }
};

/**
 * categoriasPut:
 * {{url}}api/categorias/60afb29bf3cfec3cb4c60dbd --> return la categoría con el nombre actualizado
 * header --> x_token 
 * body --> nombre (valor a actualizar)
 */
const categoriasPut = async (req, res = response) => {
    const {id} = req.params;
    const {usuario, nombre, ...resto} = req.body;

    //Se le pasa el documento con los campos a actualizar
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, {nombre});

        res.json({categoria});
    } catch (error) {
        res.status(400).json({msg:error});
    }
};

/**
 * categoriasDelete:
 * {{url}}api/categorias/id --> return la categoria borrada (estado = false)
 * header --> x-token (válido)
 */
const categoriasDelete = async (req, res = responde) => {
     const {id} = req.params;

     //Es más eficiente utilizar findbyidandupdate que el save
    try {
        const categoria = await Categoria.findByIdAndUpdate(id, {estado:false});

        res.json(categoria);
    } catch (error) {
        res.status(400).json({msg:error});
    }
};

module.exports = {
    crearCategoria,
    categoriasGet,
    categoriasPut,
    categoriasDelete
};