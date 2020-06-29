const path = require('path');
const fs = require('fs');
const { response } = require('express');

module.exports = {
    index : (req,res) =>{
        let productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
        res.render(path.resolve(__dirname , '..','views','admin','index') , {productos});
    },
    create: (req,res) =>{
        let productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
        res.render(path.resolve(__dirname, '..','views','admin','create'));
    },
    save: (req,res) =>{
        let productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
    
        let productoTotales  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
        let ultimoProducto = productoTotales.pop();
        
        let nuevoProducto = {
            ID : ultimoProducto.ID +1,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            categoria : req.body.categoria,
            stock : req.body.stock,
            precio: req.body.precio,
            descuento: req.body.descuento,
           imagen: req.file ? req.file.filename : ""     
        }
               
        productos.push(nuevoProducto);
        productosJSON = JSON.stringify(productos,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../models/productos.json'),productosJSON);
        res.redirect('/administrar');
    },
    show: (req,res) => {
        //res.send(req.params.id);
        let productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
        let productID = req.params.id;
        const productoCategoria = productos.find(product => product.ID == productID);
        res.render(path.resolve(__dirname, '..','views','admin','detail'), {productoCategoria});
    },
    destroy: (req,res) => {
        let productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
        const productID = req.params.id;
        const platoComidaFinal = productos.filter(product => product.ID != productID);
        productosJSON = JSON.stringify(platoComidaFinal,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../models/productos.json'),productosJSON);
        res.redirect('/administrar');
    },
    edit: (req,res) => {
        let productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
        let productID = req.params.id;
        const productoCategoria = productos.find(product => product.ID == productID);
        res.render(path.resolve(__dirname, '..','views','admin','edit'), {productoCategoria});
    },
    update: (req,res) =>{
        let productos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/productos.json')));
        req.body.id = req.params.id;
        let platosUpdate = productos.map(product =>{   
            if(product.ID == req.body.id){
                return product = req.body;
            }
            return product;
        });
        productosJSON = JSON.stringify(platosUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../models/productos.json'),productosJSON);
        res.redirect('/administrar');       


    }


}
