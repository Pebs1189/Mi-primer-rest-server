const Role = require('../models/role');

const esRolValido = async ( rol = '') => {
    const existeRol = await Role.findOne( { rol } );
    if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la base de datos`);
};

module.exports = {
    esRolValido
}