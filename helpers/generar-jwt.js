const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = {uid};
        const secret_key = process.env.SECRET_KEY;

        jwt.sign(
            payload, 
            secret_key, 
            {expiresIn: '4h'}, 
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                }else {
                    resolve(token);
                }
            }
        );

    });
}

module.exports = {
    generarJWT
}