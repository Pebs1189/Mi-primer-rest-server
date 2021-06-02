const { response } = require("express");
const { Producto } = require('../models');


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

module.exports = {postProducto};