const path = require('path');
const fs = require('fs');
const db = require('../database/models/');
const Op = db.Sequelize.Op;
const Product = db.Product;
const Category = db.Category;
 
//let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productos.json')));

const productoController = {
    detalle: (req, res) => {
            Product
                .findByPk(req.params.id)
                .then(productoDetalle => {
                    res.render(path.resolve(__dirname, '..', 'views', 'productos', 'detalleProducto'), {
                        productoDetalle
                    });
                    })
    
    /*function (req, res) {
        let productoId = req.params.id;
        const productoDetalle = productos.find(p => p.id == productoId);
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'detalleProducto'), {productoId, productoDetalle});
*/

    },
    categoria: async function (req, res) {
        let categoria = await Category.findAll({where:{category: req.params.categoria},include:['products']});
        //return res.send(categoria[0].products);
        let titulo = String(req.params.categoria).toUpperCase()
        let productos =categoria[0].products
        //return res.send(productos);
        res.render(path.resolve(__dirname, '..', 'views', 'productos', 'categoria-productos'), { productos,titulo});
    }



}
module.exports = productoController;