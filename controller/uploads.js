const { response } = require("express");

const {subirArchivo} = require('../helpers');


const cargarArchivo = async (req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg:'No hay archivos que subir'});
        return;
    }
   
    if (!req.files.archivo || Object.keys(req.files).length === 0) {
        res.status(400).json({msg:'No hay archivos que subir'});
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    try {
        const pathCompleto = await subirArchivo(req.files);

        res.json({nombre: pathCompleto});  
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    cargarArchivo
};