const path = require('path');
const fs = require('fs');
 const db = require('../database/models/');
 const Op = db.Sequelize.Op;
const Product = db.Product;
const Category = db.Category;
 
let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productos.json')));

const productoController = {
    detalle: (req, res) => {
            Product
                .findByPk(req.params.id)
                .then(productoDetalle => {
                        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'detalleProducto'), {productoDetalle}); })
    
    /*function (req, res) {
        let productoId = req.params.id;
        const productoDetalle = productos.find(p => p.id == productoId);
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'detalleProducto'), {productos, productoDetalle});
*/

    },
    categoria: function (req, res) {
        let productosSeleccionados = productos.filter(p => p.categoria == req.params.categoria);
        let titulo = String(req.params.categoria).toUpperCase()
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'categoria-productos'), { productos: productosSeleccionados, titulo,});
    }



}
module.exports = productoController;