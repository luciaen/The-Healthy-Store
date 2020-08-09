const path = require('path');
const fs = require('fs');
let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json')));
//requiero la base de datos
 const db = require('../database/models/');
const Op = db.Sequelize.Op;

//const {Product, Category} = require('../database/models/');

const Product = db.Product;
const Category = db.Category;

const adminController = {

   index: (req, res) => {

         Product.findAll()
            
            .then(productos => {
                //return res.send(productos)
                res.render(path.resolve(__dirname, '..', 'views', 'admin', 'index'), {
                    productos
                });
            })
            .catch(error => res.send(error))
    },
        /*index:  function (req, res) {

            res.render(path.resolve(__dirname, '..', 'views','admin', 'index'),{productos});
        },
*/
        create: function (req, res) {
            res.render(path.resolve(__dirname, '..', 'views','admin', 'create'));
        },
        show: (req, res) => {
            Product
                .findByPk(req.params.id)
                .then(productoShow => {
                    res.render(path.resolve(__dirname, '..', 'views', 'admin', 'detail'), {
                        productoShow
                    });
                })
        }, /*function(req,res){
            let productoId = req.params.id;
        const productoShow = productos.find( p=> p.id == productoId);
            res.render(path.resolve(__dirname, '..','views','admin','detail'),{productoShow});
        },*/
        save: 
        
        (req, res) => {
            const _body = req.body;
            //return res.send(_body);
                _body.name = req.body.nombre,
                _body.description = req.body.descripcion,
                _body.categoryId = req.body.categoria,
                _body.stock = Number(req.body.stock),
                _body.price = req.body.precio,
                _body.discount = req.body.descuento,
                _body.recomended = req.body.recomendado
                _body.image = req.file ? req.file.filename : 'userUndefined.jpg' // if ternario       

            Product
                .create(_body)
                .then(producto => {
                    res.redirect('/administrar');
                })

        }, 
        /*function(req,res){
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
        },*/
        edit: (req, res) => {
                Product
                    .findByPk(req.params.id)
                    .then(productoEdit => {
                        res.render(path.resolve(__dirname, '..', 'views', 'admin', 'edit'), {
                            productoEdit
                        });
                    })
                    },
        
        /*function(req,res){
        let productoId = req.params.id;
        const productoEdit = productos.find( p=> p.id == productoId);
        res.render(path.resolve(__dirname, '..','views','admin','edit'),{productoEdit});  
        },*/
        update:
        (req, res) => {
            const _body = req.body;
            //return res.send(_body);
            _body.name = req.body.nombre,
                _body.description = req.body.descripcion,
                _body.categoryId = req.body.categoria,
                _body.stock = Number(req.body.stock),
                _body.price = req.body.precio,
                _body.discount = req.body.descuento,
                _body.recomended = req.body.recomendado
                _body.image = req.file ? req.file.filename : req.body.oldImagen // if ternario       

            Product
                .update(_body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then( p => {
                    res.redirect('/administrar')
                })
                .catch(error => res.send(error)); //error de Base de Datos
        },
        
        /* function(req,res){

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
        }, */
        delete: 
        (req, res) => {
            Product
                .findByPk(req.params.id)
                .then(productoDelete => {
                    res.render(path.resolve(__dirname, '..', 'views', 'admin', 'delete'), {
                        productoDelete
                    });
                })
        },
        
        /*function(req,res){
            let productoId = req.params.id;
            const productoDelete= productos.find( p=> p.id == productoId);
                res.render(path.resolve(__dirname, '..','views','admin','delete'),{productoDelete});
        },*/
        destroy: (req, res) => {
            Product
                .destroy({
                    where: {
                        id: req.params.id
                    },
                    force: true
                })
                .then(confirm => {
                    res.redirect('/administrar');
                })
        }, /*function(req,res){
            let productos =JSON.parse(fs.readFileSync(path.resolve(__dirname,'../data/productos.json')));
            const productoId = req.params.id;
        const productoDestroy = productos.filter(p => p.id != productoId);
        productosJSON = JSON.stringify(productoDestroy,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../data/productos.json'),productosJSON);
            res.redirect('/administrar');
            }*/
            search:(req, res) =>{
                Product.findAll({
                    where:{
                        name: {[Op.like]: `%${req.query.buscar}%`}
                    }
                })
                .then(resultado => {res.render(path.resolve(__dirname, '..', 'views', 'admin', 'index'),{productos:resultado});
              })
                .catch(error => res.send(error))
            }       
    }
module.exports = adminController;