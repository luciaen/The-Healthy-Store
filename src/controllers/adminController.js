const path = require('path');
const fs = require('fs');
let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json')));


const adminController = {
        index: function (req, res) {

            res.render(path.resolve(__dirname, '..', 'views','admin', 'index'),{productos});
        },
        create: function (req, res) {
            res.render(path.resolve(__dirname, '..', 'views','admin', 'create'));
        },
        show: function(req,res){
            res.render(path.resolve(__dirname, '..','views','admin','detail'),);
        },
        save: function(req,res){
            let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json'))); 
            let productosTotales  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/productos.json')));  
            let ultimoProducto = productosTotales.pop();

            let nuevoProducto={
                id : ultimoProducto.id +1,
                categoria: req.body.categoria,
                nombre : req.body.nombre,
                descripcion : req.body.descripcion,
                stock:Number(req.body.stock),
                precio: Number(req.body.precio),
                descuento: Number(req.body.descuento),  
                imagen: req.file ? req.file.filename : ""  
            }
            productos.push(nuevoProducto);
            productosJSON=JSON.stringify(productos,null,2);
            fs.writeFileSync(path.resolve(__dirname, '../data/productos.json'),productosJSON);
            res.redirect('/administrar');
        }
    }
module.exports = adminController;