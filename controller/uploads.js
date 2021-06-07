const path = require('path');
const fs = require('fs');

const { response } = require("express");

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
    actualizarImagen,
    mostrarImagen
};