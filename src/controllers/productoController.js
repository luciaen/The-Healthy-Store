const path = require('path');
const fs = require('fs');

let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json')));

const productoController = {
    categoria: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views','productos', 'categoria-productos'));
    },
     detalle: function (req, res) {
         res.render(path.resolve(__dirname, '..', 'views','productos', 'detalle-producto'));
    },
    aceites: function(req,res){
        let productosSeleccionados= productos.filter(p => p.categoria==req.params.categoria);
        let titulo = String(req.params.categoria).toUpperCase()
        res.render(path.resolve(__dirname, '..', 'views','productos', 'categoria-aceites'),{productos:productosSeleccionados,titulo});
    }

    

}
module.exports = productoController;