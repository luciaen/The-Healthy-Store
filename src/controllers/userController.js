const path = require('path');



const userController = {
    login: function (req, res) {

        res.render(path.resolve(__dirname, '..', 'views','user', 'login'));
    },
    registro: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','user', 'registro'));
    }
}

module.exports = userController;