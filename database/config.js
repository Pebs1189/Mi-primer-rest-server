const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        const mongoCDN = process.env.MONGODB_CNN;

        await mongoose.connect(mongoCDN, { 
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            family: 4
        });

        console.log('DB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar la DB');
    }
}

module.exports = {
    dbConnection
}