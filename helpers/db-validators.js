const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async ( rol = '') => {
    const existeRol = await Role.findOne( { rol } );
    if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la base de datos`);
};

//verificar si el correo existe: express-validator
const existeEmail =  async (correo  = '') => {
    const existe = await Usuario.findOne({ correo });
    if (existe) throw new Error(`El correo ${correo} ya está registrado`);
};   

const existeUsuarioPorId = async (usuario = '') => {
    const existeUsuario = await Usuario.findById(usuario);
    if (!existeUsuario) throw new Error(`El usuario ${usuario} no existe.`);
}; 

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}