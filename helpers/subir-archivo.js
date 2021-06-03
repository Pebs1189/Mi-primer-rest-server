const {v4: uuidv4} = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesPermitidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {
    return new Promise((resolve, rejected) => {
        const {archivo} = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1].toLowerCase();
    
        if (!extensionesPermitidas.includes(extension)) {
            return rejected(`La extensión ${extension} no está permitida: ${extensionesPermitidas}`);
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
    
        const uploadPath = path.join( __dirname , '../uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                rejected(err);
            }
    
            resolve(nombreTemp);
        });
    }); 
};

module.exports = {
    subirArchivo
};