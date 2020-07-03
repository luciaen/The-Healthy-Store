const path = require('path');
const fs = require('fs');

let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productos.json')));

const productoController = {
    detalle: function (req, res) {
        let productoId = req.params.id;
        const productoDetalle = productos.find(p => p.id == productoId);
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'detalleProducto'), { productoDetalle });


    },
    categoria: function (req, res) {
        let productosSeleccionados = productos.filter(p => p.categoria == req.params.categoria);
        let productoId = req.params.id;
        const productoDetalle = productos.find(p => p.id == productoId);
        let titulo = String(req.params.categoria).toUpperCase()
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'categoria-productos'), { productos: productosSeleccionados, titulo, productoDetalle });
    }



}
module.exports = productoController;