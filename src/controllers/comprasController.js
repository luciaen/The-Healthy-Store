const path = require('path');
const fs = require('fs');
const { response } = require('express');

module.exports = {
    envios : (req,res) =>{
        const productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
        res.render(path.resolve(__dirname ,'..' ,'views','compras','carrito') , {productos});
    },
      carrito : (req,res) =>{
            const productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
            res.render(path.resolve(__dirname ,'..' ,'views','compras','envios') , {productos});
     }
    }   