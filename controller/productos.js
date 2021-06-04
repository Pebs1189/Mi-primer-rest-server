const { response } = require("express");
const { Producto } = require('../models');

/*
* getProductos:
* {{url}}/api/productos/ --> return todos los productos con estado a true (máx: 10)
* {{url}}/api/productos/id --> return el producto con el id correspondiente y el usuario que lo creó
*/
const getProductos = async (req, res = response) => {
    const {limit=10, desde=0} = req.query;
    const query = {estado:true};
    const {id} = req.params;
    let data = {};

    if (id) {
        // //populate: usa la ref del schema para obtener el objeto referido

        try {
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
        } catch (error) {
            console.log(error);
        }

    } else {
        try {
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
        } catch (error) {
            console.log(error);
        }
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
    try {
        const producto = await new Producto(data);
        //guardar en DB
        await producto.save();
    
        res.status(201).json(producto);
    } catch (error) {
        console.log(error);
    }
};

/**
 * putProducto:
 * {{url}}api/productos/60b804f1d8363b0ad8b91393 --> return producto con la variable actualizada
 * header --> x_token 
 * body --> {
    "precio":320,
    "disponible" :true
}
 */
 const putProducto = async (req, res = response) => {
    const {id} = req.params;
    const data = req.body;

    //Se le pasa el documento con los campos a actualizar
    try {
        const producto = await Producto.findByIdAndUpdate(id, data);

        res.json({producto});
    } catch (error) {
        console.log(error);
    }
};

/**
 * deleteProducto:
 * {{url}}api/productos/id --> return el producto borrado (estado = false)
 * header --> x-token (válido)
 */
 const deleteProducto = async (req, res = responde) => {
    const {id} = req.params;

    //Es más eficiente utilizar findbyidandupdate que el save
    try {
        const producto = await Producto.findByIdAndUpdate(id, {estado:false});

        res.json(producto);
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    postProducto,
    getProductos,
    putProducto,
    deleteProducto
};