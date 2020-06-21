const path = require('path');



const adminController = {
        crud: function (req, res) {

            res.render(path.resolve(__dirname, '..', 'views', 'crud'));
        },
        formproducto: function (req, res) {
            res.render(path.resolve(__dirname, '..', 'views', 'formproducto'));
        }
    }
module.exports = adminController;