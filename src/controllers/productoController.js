const path = require('path');



const productoController = {
    index: function (req, res) {
   
        res.render(path.resolve(__dirname, '..', 'views','index'));
    },
    about: function (req, res) {
               res.render(path.resolve(__dirname, '..', 'views', 'about'));
    },
    promos: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'promos'));
    },
    contacto: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'contacto'));
    },
    preguntasfrec: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'preguntasfrec'));
    },
    envios: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'envios'));
    },
    carrito: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'carrito'));
        
    },
    categoria: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'categoria-productos'));
    },
     detalle: function (req, res) {
         res.render(path.resolve(__dirname, '..', 'views', 'detalle-producto'));
     }

    

}
module.exports = productoController;