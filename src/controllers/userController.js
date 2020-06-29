const path = require('path');
const fs = require('fs');
const { response } = require('express');

module.exports = {
    login: function (req, res) {
     res.render(path.resolve(__dirname, '..', 'views', 'users','login'));
    },
    registro: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','users','registro'));
    }
}
