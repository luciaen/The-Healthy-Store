const path = require('path');



const userController = {
    login: function (req, res) {

        res.render(path.resolve(__dirname, '..', 'views', 'login'));
    },
    registro: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'registro'));
    }
}

module.exports = userController;