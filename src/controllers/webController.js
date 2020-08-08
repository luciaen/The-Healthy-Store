const path = require('path');
const fs = require('fs');

//let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json')));
const db = require('../database/models/');
const Op = db.Sequelize.Op;

const Product = db.Product;

const webController = {
    home: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','web','home'))
    },
    index: (req, res) => {
        Product
            .findAll()
            .then(productos => {
                //return res.send(productos)
                res.render(path.resolve(__dirname, '..', 'views', 'web', 'index'), {
                    productos
                });
            })
            .catch(error => res.send(error))
    },
    /*index: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','web','index'),{productos});
    },*/
    about: function (req, res) {
               res.render(path.resolve(__dirname, '..', 'views','web', 'about'));
    },
    promos: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','web', 'promos'));
    },
    contacto: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','web', 'contacto'));
    },
    preguntasfrec: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','web', 'preguntasfrec'));
    }
}

module.exports = webController;