const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String, 
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario : {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        defailt: true
    }
});

//Quita del esquema el password y la versión
ProductoSchema.methods.toJSON = function () {
    const {__v, estado, _id, ...producto } = this.toObject();

    return producto;
};

module.exports = model('Producto', ProductoSchema);