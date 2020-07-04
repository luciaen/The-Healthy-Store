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
            let productoId = req.params.id;
        const productoShow = productos.find( p=> p.id == productoId);
            res.render(path.resolve(__dirname, '..','views','admin','detail'),{productoShow});
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
                recomendado:(req.body.recomendado),  
                imagen: req.file ? req.file.filename : ""  
            }
            productos.push(nuevoProducto);
            productosJSON=JSON.stringify(productos,null,2);
            fs.writeFileSync(path.resolve(__dirname, '../data/productos.json'),productosJSON);
            res.redirect('/administrar');
        },
        edit: function(req,res){
        let productoId = req.params.id;
        const productoEdit = productos.find( p=> p.id == productoId);
        res.render(path.resolve(__dirname, '..','views','admin','edit'),{productoEdit});  
        },
        update: function(req,res){

            let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json')));
            req.body.id = req.params.id;
            let productosUpdate = productos.map(p =>{
                if(p.id == req.body.id){

                    p.categoria = req.body.categoria,
                    p.nombre = req.body.nombre,
                    p.descripcion = req.body.descripcion,
                    p.stock =  Number(req.body.stock),
                    p.precio = Number(req.body.precio),
                    p.descuento = Number(req.body.descuento),
                    p.recomendado=(req.body.recomendado), 
                    p.imagen = req.file ? req.file.filename : ""
                }
                return p;
            });
            productosJSON=JSON.stringify(productosUpdate,null,2);
            fs.writeFileSync(path.resolve(__dirname, '../data/productos.json'),productosJSON);
            res.redirect('/administrar'); 
        },
        delete: function(req,res){
            let productoId = req.params.id;
            const productoDelete= productos.find( p=> p.id == productoId);
                res.render(path.resolve(__dirname, '..','views','admin','delete'),{productoDelete});
        },
        destroy: function(req,res){
            let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json')));
            const productoId = req.params.id;
        const productoDestroy = productos.filter(p => p.id != productoId);
        productosJSON = JSON.stringify(productoDestroy,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../data/productos.json'),productosJSON);
            res.redirect('/administrar'); 
        }
    }
module.exports = adminController;