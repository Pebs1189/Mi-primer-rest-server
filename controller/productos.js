const { response } = require("express");
const { Producto } = require('../models');

/*
* categoriasGET:
* {{url}}/api/categoria/ --> return todas las categorias con estado a true (máx: 10)
* {{url}}/api/categoria/id --> return la categoria con el id correspondiente y el usuario que lo creó
*/
const getProductos = async (req, res = response) => {
    const {limit=10, desde=0} = req.query;
    const query = {estado:true};
    const {id} = req.params;
    let data = {};

    if (id) {
        // //populate: usa la ref del schema para obtener el objeto referido
        const {_id,
            nombre, 
            precio, 
            descripcion,
            disponible,
            usuario, 
            categoria
        } = await Producto.findById(id)
            .populate({path:'usuario', select: 'nombre'})
            .populate({path:'usuario', select: 'rol'})
            .populate('categoria', 'nombre');

        data = {id:_id, nombre, precio, descripcion, disponible, usuario, categoria};
    } else {
        //paginacion de resiltado
        const resp = await Promise.all([
            Producto.countDocuments(query), //total categorias
            Producto.find(query)            //resultado de la busqueda
                .limit(Number(limit))        //max resultado a mostrar
                .skip(Number(desde))         //muestra a partir del resultado x 
                .populate('usuario','nombre')
                .populate('categoria','nombre')
        ]);

        //destructuración de arreglos [total de registros, resultado de la busqueda]
        const [total, productos] = resp;

        data = {
            total,
            productos
        };
    }

    res.json(data);
};

/*
* postProducto:
* {{url}}api/productos --> return error status 400 si la categoría ya existe
* headers --> x-token (usuario atutenticado)
* body --> {
    "nombre":"Acer 27 pulgadas - 2021",
    "precio":"230€",
    "descripcion":"Pantalla 4K Acer 27 pulgadas - 220hz",
    "disponible":true,
    "categoria": "60b6d6056c04843c2cd85f3c"
}
*/
const postProducto = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const productoDB = await Producto.findOne({nombre});

    const {__v, categoria, ...resto} = req.body;

    if (productoDB) {
        return res.status(400).json({msg: `El producto ${productoDB.nombre}, ya existe`});
    }

    const data = {
        nombre,
        ...resto,
        categoria,
        usuario: req.usuario._id
    };

    //crear la cateogría
    const producto = await new Producto(data);
    //guardar en DB
    await producto.save();

    res.status(201).json(producto);
};

module.exports = {
    postProducto,
    getProductos
};