const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
//let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')));

const db = require('../database/models/');
const Op = db.Sequelize.Op;

//const {Product, Category} = require('../database/models/');

const User = db.User;

const userController = {

    login: function (req, res) {

        res.render(path.resolve(__dirname, '..', 'views', 'user', 'login'));
    },
    registro: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'registro'));
    },
    /*index: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'index'),{usuarios});
        
    },*/
    index: (req, res) => {

        User.findAll()

            .then(user => {
                //return res.send(productos)
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'index'), {
                    user
                });
            })
            .catch(error => res.send(error))
    },
    newRegister: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.name = req.body.nombre
            _body.lastName = req.body.lastname,
                _body.email = req.body.email,
                _body.phone = req.body.telefono,
                _body.password = bcrypt.hashSync(req.body.password, 10),
                _body.admin = 0
            _body.image = req.file ? req.file.filename : 'userUndefined.jpg'
            User
                .create(_body)
                .then(usuario => {
                    res.redirect('/login');
                })

        }
        else {

            return res.render(path.resolve(__dirname, '../views/user/registro'),
                { errors: errors.mapped(), old: req.body });

        }
    },
    create: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'create'));
    },
    newCreate: function (req, res) {

        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.name = req.body.nombre
            _body.lastName = req.body.lastname,
                _body.email = req.body.email,
                _body.phone = req.body.telefono,
                _body.password = bcrypt.hashSync(req.body.password, 10),
                _body.admin = Number(req.body.admin),
                _body.image = req.file ? req.file.filename : 'userUndefined.jpg'
            User
                .create(_body)
                .then(usuario => {
                    res.redirect('/usuarios');
                })

        }
        else {

            return res.render(path.resolve(__dirname, '../views/user/create'),
                { errors: errors.mapped(), old: req.body });

        }

    },
    /*newCreate:function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')));
            let usuariosTotales = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')));
            let ultimoUsuario = usuariosTotales.pop();

            let nuevoUsuario = {
                id: ultimoUsuario.id + 1,
                nombre: req.body.nombre,
                apellido: req.body.lastname,
                email: req.body.email,
                telefono: Number(req.body.telefono),
                contraseña: bcrypt.hashSync(req.body.password, 10),
                administra: req.body.admin ? true : false,
                imagen: req.file ? req.file.filename : "userUndefined.jpg"

            }
            usuarios.push(nuevoUsuario);
            usuariosJSON = JSON.stringify(usuarios, null, 2);
            fs.writeFileSync(path.resolve(__dirname, '../data/usuarios.json'), usuariosJSON);
            res.redirect('/login');
        } else {
            res.render(path.resolve(__dirname, '../views/user/create'), { errors: errors.mapped(), old: req.body });
        }
    },*/
    show: (req, res) => {
        User
            .findByPk(req.params.id)
            .then(userShow => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'detail'), {
                    userShow
                });
            })
    },
    /*show: function (req, res) {
        let usuarioId = req.params.id;
        const usuarioShow = usuarios.find(u => u.id == usuarioId);
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'detail'),{usuarioShow});
    },*/
    edit: (req, res) => {
        User
            .findByPk(req.params.id)
            .then(userEdit => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'edit'), { userEdit });
            })
    },
    /*edit: function (req, res) {
        let usuarioId = req.params.id;
        const usuarioEdit = usuarios.find(u => u.id == usuarioId);
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'edit'),{usuarioEdit});
    },*/
    update: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.name = req.body.name
            _body.lastName = req.body.lastname,
                _body.email = req.body.email,
                _body.phone = req.body.phone,
                _body.admin = req.body.admin,
                _body.image = req.file ? req.file.filename : req.body.oldImagen
                if(_body.password == '') {

                    _body.password = _body.password_old
                } else {
                    _body.password = bcrypt.hashSync(req.body.password, 10)
    
                }
            User
                .update(_body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(usuario => {
                    res.redirect('/usuarios');
                })
                .catch(error => res.send(error));

        }
        else {
            User
            .findByPk(req.params.id)
            .then(userEdit => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'edit'), { userEdit: userEdit, errors: errors.mapped() })
            })
        }

    },
    delete:
        (req, res) => {
            User
                .findByPk(req.params.id)
                .then(userDelete => {
                    res.render(path.resolve(__dirname, '..', 'views', 'user', 'delete'), {
                        userDelete
                    });
                })
        },
    /*delete: function (req, res) {
        let usuarioId = req.params.id;
        const usuarioDelete = usuarios.find(u => u.id == usuarioId);
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'delete'),{usuarioDelete});
    },*/
    destroy: (req, res) => {
        User
            .destroy({
                where: {
                    id: req.params.id
                },
                force: true
            })
            .then(confirm => {
                res.redirect('/usuarios');
            })
    },
    /*destroy: function (req, res) {
        let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')));
        const usuarioId = req.params.id;
        const usuarioDestroy = usuarios.filter(u => u.id != usuarioId);
        usuariosJSON = JSON.stringify(usuarioDestroy, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../data/usuarios.json'), usuariosJSON);
        res.redirect('/usuarios');
    },*/
    getIn: function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            var usuarioaLoguearse = [];
            User.findOne({
                where: {
                   email: req.body.email
                }
              }).then(usuarioLogueado =>{
                delete usuarioLogueado.password;  
                req.session.usuario = usuarioLogueado;  
                if(req.body.recordarme){
                    res.cookie('email',usuarioLogueado.email,{maxAge: 1000 * 60 * 60 * 24})
                  }
                  return res.redirect('/index');   //Aquí ustedes mandan al usuario para donde quieran (Perfil- home)
              }) 
        } else {
            res.render(path.resolve(__dirname, '../views/user/login'), { errors: errors.mapped(), old: req.body });
        }
    },
    logout: function (req, res) {
        req.session.destroy();
        res.cookie('email', null, { maxAge: -1 });
        res.redirect('/index')
    },
    perfil: (req, res) => {
        User
        .findAll({
            where:{id: req.session.usuario.id}
        }).then(userPerfil=>{
            res.render(path.resolve(__dirname, '..', 'views', 'user', 'perfil'), {userPerfil : userPerfil[0]})
        }).catch(error=> res.send(error))
        
    },
    /*perfil: function (req, res) {
        let userId = req.params.id;
        const usuarioPerfil = usuarios.find(u => u.id == userId);
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'perfil'), { usuarioPerfil });
    },*/

    editperfil: (req, res) => {
        User
            .findByPk(req.session.usuario.id)
            .then(editPerfil => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'editperfil'), {editPerfil:editPerfil});
            })
    },
    /*editperfil: function (req, res) {
        let usuarioId = req.params.id;
        let editPerfil = User.find(u => u.id == usuarioId);
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'editperfil'), { editPerfil });
    },*/
    updateperfil: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.name = req.body.name
            _body.lastName = req.body.lastname,
                _body.email = req.body.email,
                _body.phone = req.body.phone,
                _body.password =  bcrypt.hashSync(req.body.password, 10),
                _body.image = req.file ? req.file.filename : req.body.oldImagen
                if(_body.password == '') {

                    _body.password = _body.password_old
                } else {
                    _body.password = bcrypt.hashSync(req.body.password, 10)
    
                }
            User
                .update(_body, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(usuario => {
                    res.redirect('/index');
                })
                .catch(error => res.send(error));

        } else {
            User
            .findByPk(req.params.id)
            .then(editPerfil => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'editperfil'), { editPerfil: editPerfil, errors: errors.mapped() })
            })
        }

    },
    /*
    
    function (req, res) {
        //Requerir los errores de las ruta
        let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')));
        req.body.id = req.params.id;
        let usuariosUpdate = usuarios.map(u => {
            if (u.id == req.body.id) {
                u.nombre = req.body.nombre,
                    u.apellido = req.body.lastname,
                    u.email = req.body.email,
                    u.telefono = Number(req.body.telefono),
                    u.contraseña = bcrypt.hashSync(req.body.password, 10),
                    u.imagen = req.file ? req.file.filename : req.body.oldImagen
            }
            return u;
        });
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            usuariosJSON = JSON.stringify(usuariosUpdate, null, 2);
            fs.writeFileSync(path.resolve(__dirname, '../data/usuarios.json'), usuariosJSON);
            res.redirect('/index');
        } else {
            let usuarioId = req.params.id;
            const editPerfil = usuarios.find(u => u.id == usuarioId);
            return res.render(path.resolve(__dirname, '../views/user/editperfil'), {
                errors: errors.mapped(),
                editPerfil: editPerfil
            });

        }
    },*/
    search:(req, res) =>{
        User.findAll({
            where:{
                name: {[Op.like]: `%${req.query.buscar}%`}
            }
        })
        .then(resultado => {res.render(path.resolve(__dirname, '..', 'views', 'user', 'index'),{user:resultado});
      })
        .catch(error => res.send(error))
    }       
}

module.exports = userController;
