const express = require('express');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('hi world');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});