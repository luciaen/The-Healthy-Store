const path = require('path');

const carritoController= {
    carrito: function (req, res) {
   
        res.render(path.resolve(__dirname, '..', 'views','compras','carrito'));
    },
    envios: function(req,res){
        res.render(path.resolve(__dirname, '..', 'views','compras','envios')); 
    },
}


module.exports = carritoController;