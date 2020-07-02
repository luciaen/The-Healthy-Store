const path = require('path');
const fs = require('fs');

let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productos.json')));

const productoController = {
    detalle: function (req, res) {
        let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productos.json')));
        let detalleSeleccionados= productos.filter(p=> p.id == req.params.id);
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'detalleProducto'),{detalleSeleccionados});

    },
    categoria: function (req, res) {
        let productosSeleccionados = productos.filter(p => p.categoria == req.params.categoria);
        let detalleSeleccionados= productos.filter(p=> p.id == req.params.id);
        let titulo = String(req.params.categoria).toUpperCase()
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'categoria-productos'), { productos: productosSeleccionados, titulo, detalleSeleccionados });
    }



}
module.exports = productoController;