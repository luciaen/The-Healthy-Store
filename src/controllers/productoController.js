const path = require('path');
const fs = require('fs');
const { response } = require('express');



module.exports = {
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
    categoria: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'categoria-productos'));
    },
     detalle: function (req, res) {
         res.render(path.resolve(__dirname, '..', 'views', 'detalle-producto'));
     }
    }