const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const db = require('../database/models/');
const Op = db.Sequelize.Op;

const User = db.User;

const userController = {

    login: function (req, res) {

        res.render(path.resolve(__dirname, '..', 'views', 'user', 'login'));
    },
    registro: function (req, res) {
        res.render(path.resolve(__dirname, '..', 'views', 'user', 'registro'));
    },

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

    show: (req, res) => {
        User
            .findByPk(req.params.id)
            .then(userShow => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'detail'), {
                    userShow
                });
            })
    },
 
    edit: (req, res) => {
        User
            .findByPk(req.params.id)
            .then(userEdit => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'edit'), { userEdit });
            })
    },
 
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
            if (_body.password == '') {

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

    getIn: function (req, res) {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then(usuarioLogueado => {
                delete usuarioLogueado.password;
                req.session.usuario = usuarioLogueado;
                if (req.body.recordarme) {
                    res.cookie('email', usuarioLogueado.email, { maxAge: 1000 * 60 * 60 * 24 })
                }
                return res.redirect('/index'); 
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
                where: { id: req.session.usuario.id }
            }).then(userPerfil => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'perfil'), { userPerfil: userPerfil[0] })
            }).catch(error => res.send(error))

    },
     editperfil: (req, res) => {
        User
            .findByPk(req.session.usuario.id)
            .then(editPerfil => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'editperfil'), { editPerfil: editPerfil });
            })
    },
    updateperfil: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.name = req.body.name
            _body.lastName = req.body.lastname,
                _body.email = req.body.email,
                _body.phone = req.body.phone,
                _body.image = req.file ? req.file.filename : req.body.oldImagen
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
    search: (req, res) => {
        User.findAll({
            where: {
                name: { [Op.like]: `%${req.query.buscar}%` }
            }
        })
            .then(resultado => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'index'), { user: resultado });
            })
            .catch(error => res.send(error))
    },
    editPassword: (req, res) => {
        User
            .findByPk(req.session.usuario.id)
            .then(editPassword => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'editPassword'), { editPassword: editPassword });
            })
    },
    editEmail: (req, res) => {
        User
            .findByPk(req.session.usuario.id)
            .then(editEmail => {
                res.render(path.resolve(__dirname, '..', 'views', 'user', 'editEmail'), {editEmail: editEmail });
            })
    },
    updatePassword: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.password = bcrypt.hashSync(req.body.password, 10),
                User
                    .update(_body, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(usuario => {
                        res.redirect('/perfil');
                    })
                    .catch(error => res.send(error));

        } else {
            User
                .findByPk(req.params.id)
                .then(editPassword => {
                    res.render(path.resolve(__dirname, '..', 'views', 'user', 'editPassword'), { editPassword: editPassword, errors: errors.mapped() })
                })
        }
    },
    updateEmail: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.email= req.body.email
                User
                    .update(_body, {
                        where: {
                            id: req.params.id
                        }
                    })
                    .then(usuario => {
                        res.redirect('/perfil');
                    })
                    .catch(error => res.send(error));

        } else {
            User
                .findByPk(req.params.id)
                .then(editEmail => {
                    res.render(path.resolve(__dirname, '..', 'views', 'user', 'editEmail'), {editEmail:editEmail, errors: errors.mapped() })
                })
        }
    },
    editPerfilCrud:(req,res)=>{
        User
        .findByPk(req.params.id)
        .then(editPerfilCrud => {
            res.render(path.resolve(__dirname, '..', 'views', 'user', 'editPerfilCrud'), {editPerfilCrud: editPerfilCrud });
        })
    },
    updateperfilCrud: function (req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.name = req.body.name
            _body.lastName = req.body.lastname,
                _body.email = req.body.email,
                _body.phone = req.body.phone,
                _body.image = req.file ? req.file.filename : req.body.oldImagen
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

        } else {
            User
                .findByPk(req.params.id)
                .then(editPerfilCrud => {
                    res.render(path.resolve(__dirname, '..', 'views', 'user', 'editPerfilCrud'), {editPerfilCrud: editPerfilCrud, errors: errors.mapped() })
                })
        }

    },
    editPasswordCrud:(req,res)=>{
        User
        .findByPk(req.params.id)
        .then(editPasswordCrud => {
            res.render(path.resolve(__dirname, '..', 'views', 'user', 'editPasswordCrud'), {editPasswordCrud: editPasswordCrud });
        })
    },
    updatePasswordCrud: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.password = bcrypt.hashSync(req.body.password, 10),
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

        } else {
            User
                .findByPk(req.params.id)
                .then(editPasswordCrud => {
                    res.render(path.resolve(__dirname, '..', 'views', 'user', 'editPasswordCrud'), {editPasswordCrud: editPasswordCrud, errors: errors.mapped() })
                })
        }
    },
    editEmailCrud:(req,res)=>{
        User
        .findByPk(req.params.id)
        .then(editEmailCrud => {
            res.render(path.resolve(__dirname, '..', 'views', 'user', 'editEmailCrud'), {editEmailCrud: editEmailCrud });
        })
    },
    updateEmailCrud: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            const _body = req.body
            _body.email= req.body.email
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

        } else {
            User
                .findByPk(req.params.id)
                .then(editEmailCrud => {
                    res.render(path.resolve(__dirname, '..', 'views', 'user', 'editEmailCrud'), {editEmailCrud:editEmailCrud, errors: errors.mapped() })
                })
        }
    }
}

module.exports = userController;
