const path = require('path');
const fs = require('fs');
const { response } = require('express');

module.exports= {
    index: function (req, res) {
       res.render(path.resolve(__dirname, '..', 'views', 'web','index'));
    },
    about: function (req, res) {
               res.render(path.resolve(__dirname, '..', 'views','web', 'about'));
    },
    promos: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'web','promos'));
    },
    contacto: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'web','contacto'));
    },
    preguntasfrec: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'web','preguntasfrec'));
    }
}    