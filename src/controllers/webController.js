const path = require('path');
const fs = require('fs');

let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json')));

const webController = {
    home: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','web','home'))
    },
    index: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','web','index'),{productos});
    },
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