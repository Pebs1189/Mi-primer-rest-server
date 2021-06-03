
const dbValidator = require('../helpers/db-validators');
const generarJWT = require('../helpers/generar-jwt');
const googleVerify = require('../helpers/google-verify');
const subirArchivo = require('../helpers/subir-archivo');


module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
};