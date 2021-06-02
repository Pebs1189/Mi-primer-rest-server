const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String, 
        unique: true,
        required: [true, 'El rol es obligatorio']
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
    }
});

//Quita del esquema el password y la versión
CategoriaSchema.methods.toJSON = function () {
    const {__v, estado, _id, ...categoria } = this.toObject();

    return categoria;
}

module.exports = model('Categoria', CategoriaSchema);