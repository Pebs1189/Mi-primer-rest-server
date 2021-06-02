const {response} = require('express');
const bcryptjs = require('bcryptjs');

const {Usuario} = require('../models');

const { generarJWT } = require('../helpers/generar-jwt');
const {googleVerify} = require('../helpers/google-verify');


/**
 * login:
 * {{url}}api/auth/login --> return la info del usuario autenticado y su token activo
 * body --> {
    "correo":"test1@yahoo.com",
    "password":"123456"
}
 */
const login = async (req, res = response) => {
    const {correo, password} = req.body;

    try {
        //verificar si email existe

        //si el usuario está activo
        const usuario = await Usuario.findOne({ correo });
        if (!usuario)  return res.status(400).json({msg:'Usuario / Password no son correctos - estado: false'});  

        //verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validaPassword)  return res.status(400).json({msg:'Usuario / Password no son correctos - password'});  
        
        //generar el JWt
        const token = await generarJWT(usuario.id); 

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:'Hable con el admin'});
    }
};

/**
 * googleSignin:
 * guarda la info del usuario de inicio sesion de google (no funciona si se intenta logear con login usuario normal)
 */
const googleSignin = async (req, res = response) => {
    const {id_token} = req.body;

    try {
        const {nombre, img, correo} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: '123456',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if (!usuario.estado) {
            return res.status(401).json({msg:'Usuario bloqueado - hable con el admin'});
        }

        const token = await generarJWT(usuario.id);

        res.json({usuario, token});
    } catch (error) {
        res.status(400).json({msg:'Token de google no es valido', id_token});
    }
};

module.exports = {
    login,
    googleSignin
};