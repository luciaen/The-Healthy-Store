const { check, validationResult, body } = require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
//let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')))
const db = require('../database/models');
const Op = db.Sequelize.Op;

//const {Product, Category} = require('../database/models/');

const User = db.User;

module.exports = {

    getIn: [
        check('email').isEmail().withMessage('Email invalido'),
        check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener minimo 6 caracteres'),
        //Validacion con la base de datos

        body('email').custom(async value => Array.from(await User.findAll()).filter(usuario => usuario.email == value).length > 0 ? false : Promise.reject("El usuario no se encuentra registrado")),

        body('email').custom(async (value, { req }) => {

            let usuarios = Array.from(await User.findAll())

            let usuario = usuarios.find(usuario => usuario.email == value)

            //console.log(bcrypt.compareSync(req.body.password, usuario.password))

            return bcrypt.compareSync(req.body.password, usuario.password) ? true : Promise.reject("Usuario o contraseña no coinciden")
        })


    ],
    newRegister: [
        check('nombre').isLength({ min: 2 }).withMessage('Campo nombre obligatorio'),
        check('lastname').isLength({ min: 2 }).withMessage('Campo apellido obligatorio'),
        check('email').isEmail().withMessage('Mail invalido'),
        check('telefono').isLength({ min: 1 }).withMessage('El campo telefono no puede estar vacio'),
        check('password').isLength({ min: 6, max: 15 }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),
        check('confirmpassword').isLength({ min: 6, max: 15 }).withMessage('La confirmación de la contraseña debe tener entre 6 y 15 caracteres'),
        //EXPLICACION DE ESTO
        body('email').custom(async value => Array.from(await User.findAll()).filter(usuario => usuario.email == value).length > 0 ? Promise.reject("El usuario ya se encuentra registrado") : true),
        body('confirmpassword').custom((value, { req }) => {
            if (req.body.password == value) {
                return true
            } else {
                return false
            }
        }).withMessage('Las contraseñas deben ser iguales'),

    // ACA ESTAN LAS VALIDACIONES PARA IMAGENES DEL BACK  

    //VALIDACION DE QUE EL CAMPO IMAGEN NO ESTE VACIO   
        body('imagen').custom((value, {req}) =>{
            if(req.file != undefined){
                return true
            }
            return false;
        }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG'),

    //2DA VALIDACION DONDE SE INDICA CUALES SON LAS EXTENCIONES PERMITIDAS    
        body('imagen').custom(function (value, { req }) {
            let ext;
            
            if(req.file.filename == undefined){
                return false
            }else{
                ext = path.extname(req.file.filename).toUpperCase();
            }
            
            if (
                ext == ".JPG" ||
                ext == ".JPEG" ||
                ext == ".PNG" ||
                ext == ".GIF"){
                    return true;
                }
                return false;
        }).withMessage('Imágen obligatoria - Solo archivos JPG, JPEG, PNG o GIF')
    ],

    newCreate: [
        check('nombre').isLength({ min: 1 }).withMessage('Campo nombre obligatorio'),
        check('lastname').isLength({ min: 1 }).withMessage('Campo apellido obligatorio'),
        check('email').isEmail().withMessage('Mail invalido'),
        check('telefono').isLength({ min: 1 }).withMessage('El campo telefono no puede estar vacio'),
        check('password').isLength({ min: 6, max: 15 }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),
        check('confirmpassword').isLength({ min: 6, max: 15 }).withMessage('La confirmación de la contraseña debe tener entre 6 y 15 caracteres'),
        //explicar esto
        body('email').custom(async value => Array.from(await User.findAll()).filter(usuario => usuario.email == value).length > 0 ? Promise.reject("El usuario ya se encuentra registrado") : true),
        body('confirmpassword').custom((value, { req }) => {
            if (req.body.password == value) {
                return true
            } else {
                return false
            }
        }).withMessage('Las contraseñas deben ser iguales'),
        body('imagen').custom(function (value, {
            req
        }) {
            let ext;

            if (req.file.filename == undefined) {
                return false
            } else {
                ext = path.extname(req.file.filename).toUpperCase();
            }

            if (
                ext == ".JPG" ||
                ext == ".JPEG" ||
                ext == ".PNG" ||
                ext == ".GIF") {
                return true;
            }
            return false;
        }).withMessage('Imágen obligatoria - Solo archivos JPG, JPEG, PNG o GIF')
    ],

    update: [
        check('name').isLength({ min: 3, max: 25 }).withMessage('El nombre debe tener entre 3 y 25 caracteres'),
        check('lastname').isLength({ min: 3, max: 25 }).withMessage('El apellido debe tener entre 3 y 25 caracteres'),
        check('email').isEmail().withMessage('el formato del mail es erroneo'),
        check('phone').isLength({ min: 6, max: 15 }).withMessage('el telefono no puede quedar vacío'),
        body('password').custom(function (value) {

            if (value != '') {
                if (value.length > 5 && value.length < 16) {

                    return true
                }
            }
            if (value == '') {

                return true
            }
            return false
        }).withMessage('la clave debe ser entre 6 y 15 caracteres'),

        body('password').custom(function (value, { req }) {
            if (req.body.confirmpassword == value) {
                return true
            }
            return false
        }).withMessage('Las contraseñas no coinciden'),
        /*body('imagen').custom(function (value, {
            req
        }) {
            let ext;

            if (req.file.filename == undefined) {
                return false
            } else {
                ext = path.extname(req.file.filename).toUpperCase();
            }

            if (
                ext == ".JPG" ||
                ext == ".JPEG" ||
                ext == ".PNG" ||
                ext == ".GIF") {
                return true;
            }
            return false;
        }).withMessage('Imágen obligatoria - Solo archivos JPG, JPEG, PNG o GIF')*/
    ]
    ,
    updatePerfil: [
        check('name').isLength({ min: 3, max: 25 }).withMessage('El nombre debe tener entre 3 y 25 caracteres'),
        check('lastname').isLength({ min: 3, max: 25 }).withMessage('El apellido debe tener entre 3 y 25 caracteres'),
        check('phone').isLength({ min: 6, max: 15 }).withMessage('el telefono no puede quedar vacío'),
        
    ],
    editPassword: [
        check('password').isLength({ min: 8, max: 15 }).withMessage('La nueva contraseña debe tener entre 8 y 15 caracteres'),
        body('oldPassword').custom(async (value, { req }) => {

            let usuarios = await User.findAll({ where: { id: req.session.usuario.id } })
            let usuarioPassword = usuarios[0].password;
            //console.log(usuarioPassword);
            return bcrypt.compareSync(value, usuarioPassword) ? true : Promise.reject("Contraseña incorrecta")
        }),

        body('password').custom(function (value, { req }) {
            if (req.body.confirmPassword == value) {
                return true
            }
            return false
        }).withMessage('Las contraseñas no coinciden')
    ],
    editPasswordCrud: [
        check('password').isLength({ min: 6, max: 15 }).withMessage('La nueva contraseña debe tener entre 6 y 15 caracteres'),
        body('oldPassword').custom(async (value, { req }) => {

            let usuarios = await User.findAll({ where: { id: req.params.id } })
            let usuarioPassword = usuarios[0].password;
            //console.log(usuarioPassword);
            return bcrypt.compareSync(value, usuarioPassword) ? true : Promise.reject("Contraseña incorrecta")
        }),

        body('password').custom(function (value, { req }) {
            if (req.body.confirmPassword == value) {
                return true
            }
            return false
        }).withMessage('Las contraseñas no coinciden')
    ],
    editEmail:[
        check('email').isEmail().withMessage('el formato del mail es erroneo'),
        body('email').custom(async value => Array.from(await User.findAll()).filter(usuario => usuario.email == value).length > 0 ? Promise.reject("Este E-mail ya esta en uso") : true),
    ]
};