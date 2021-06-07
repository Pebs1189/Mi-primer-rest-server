const path = require('path');
const fs = require('fs');

const { response } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const {subirArchivo} = require('../helpers');
const {Usuario, Producto} = require('../models');


const cargarArchivo = async (req, res = response) => { 
    try {
        const pathCompleto = await subirArchivo(req.files, ['txt', 'md'], 'img');

        res.json({nombre: pathCompleto});  
    } catch (error) {
        res.status(400).json({msg:error});
    }
};

const actualizarImagen = async (req, res = response) => {
    const {coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: `No existe el usuario con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: `No existe el producto con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg:'Se me olvidó validar esto'});
            break;
    }
 
    try {
        if (modelo.img) {
            const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg);
            }
        }

        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;

        await modelo.save();
    } catch (error) {
        res.status(400).json({msg:error});
    }

    res.json(modelo);
};

const actualizarImagenCloudinary = async (req, res = response) => {
    const {coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: `No existe el usuario con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: `No existe el producto con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg:'Se me olvidó validar esto'});
            break;
    }
 
    try {
        if (modelo.img) {
            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[nombreArr.length-1];
            const [public_id] = nombre.split('.');

            cloudinary.uploader.destroy(public_id);    
        }

        const { tempFilePath } = req.files.archivo;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

        modelo.img = secure_url;
        
        await modelo.save();

        res.json(modelo);

    } catch (error) {
        res.status(400).json({msg:error});
    }
};

const mostrarImagen = async (req, res = response) => {
    const {coleccion, id} = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: `No existe el usuario con el id ${id}`});
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({msg: `No existe el producto con el id ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg:'Se me olvidó validar esto'});
            break;
    }
 
    try {
        if (modelo.img) {
            const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if (fs.existsSync(pathImg)) {
                return res.sendFile(pathImg);
            } 
        } else {
            const pathDefault = path.join(__dirname, '../assets', 'no-image.jpg');
            return res.sendFile(pathDefault);
        }
    } catch (error) {
        res.status(400).json({msg:error});
    }
};

module.exports = {
    cargarArchivo,
    mostrarImagen,
    actualizarImagenCloudinary
};