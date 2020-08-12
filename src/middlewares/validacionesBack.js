const {check,validationResult,body}=require('express-validator');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
//let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')))
const db = require('../database/models/');
const Op = db.Sequelize.Op;

//const {Product, Category} = require('../database/models/');

const User = db.User;

module.exports= {

getIn : [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min: 6 }).withMessage('La contraseña debe tener minimo 6 caracteres'),
    //Validacion con la base de datos

    body('email').custom(async (value, {req}) =>{

        let usuarios = Array.from(await User.findAll())
        
        let usuario = usuarios.find(usuario => usuario.email == value)

        //console.log(usuario)
        
        return bcrypt.compareSync(req.body.password, usuario.password) ? Promise.reject("Usuario o contraseña no coinciden") : true
    })

    //Validacion con el JSON 
    /*body('password').custom( (value, {req}) =>{
        let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')))
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email == req.body.email) {
                if(bcrypt.compareSync(value, usuarios[i].contraseña)){
                  return true;
                }else{
                  return false;
                }
            }
        }
     }).withMessage('Usuario o contraseña no coinciden')*/
],
newRegister: [
    check('nombre').isLength({ min: 1 }).withMessage('Campo nombre obligatorio'),
    check('lastname').isLength({min: 1}).withMessage('Campo apellido obligatorio'),
    check('email').isEmail().withMessage('Mail invalido'),
    check('telefono').isLength({ min: 1 }).withMessage('El campo telefono no puede estar vacio'),
    check('password').isLength({ min: 6, max: 15 }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),
    check('confirmpassword').isLength({min: 6, max: 15 }).withMessage('La confirmación de la contraseña debe tener entre 6 y 15 caracteres'),
    //EXPLICACION DE ESTO
    body('email').custom(async value => Array.from(await User.findAll()).filter(usuario => usuario.email == value).length > 0 ? Promise.reject("El usuario ya se encuentra registrado") : true),
    body('confirmpassword').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true     
        }else{
            return false
        }    
    }).withMessage('Las contraseñas deben ser iguales')
],

newCreate: [
    check('nombre').isLength({ min:1 }).withMessage('Campo nombre obligatorio'),
    check('lastname').isLength({min:1}).withMessage('Campo apellido obligatorio'),
    check('email').isEmail().withMessage('Mail invalido'),
    check('telefono').isLength({ min: 1 }).withMessage('El campo telefono no puede estar vacio'),
    check('password').isLength({ min: 6, max: 15 }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),
    check('confirmpassword').isLength({min: 6, max: 15 }).withMessage('La confirmación de la contraseña debe tener entre 6 y 15 caracteres'),
    //explicar esto
    body('email').custom(async value => Array.from(await User.findAll()).filter(usuario => usuario.email == value).length > 0 ? Promise.reject("El usuario ya se encuentra registrado") : true),
    body('confirmpassword').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true     
        }else{
            return false
        }    
    }).withMessage('Las contraseñas deben ser iguales')
],
update : [
    check('nombre').isLength({ min:3, max: 25 }).withMessage('Campo nombre obligatorio'),
    check('apellido').isLength({ min:3, max: 25 }).withMessage('Campo apellido obligatorio'),
    check('email').isEmail().withMessage('el formato del mail es erroneo'),
    check('telefono').isLength({ min: 6, max: 15 }).withMessage('el telefono no puede quedar vacío'),
    check('password').isLength({ min: 6, max: 15 }).withMessage('la clave debe ser entre 6 y 15 caracteres'),
    body('password').custom(function (value, { req }) {
    if (req.body.confirmpassword == value) {
        return true
    }
    return false
    }).withMessage('Las contraseñas no coinciden')
],
updatePerfil : [
    check('nombre').isLength({min: 1, max: 25}).withMessage('Campo nombre obligatorio'),
    check('lastname').isLength({min: 3, max: 25}).withMessage('Campo apellido obligatorio'),
    check('email').isEmail().withMessage('el formato del mail es erroneo'),
    check('telefono').isLength({min: 6, max: 15}).withMessage('el telefono no puede quedar vacío'),
    check('password').isLength({min: 6, max: 15}).withMessage('la clave debe ser entre 6 y 15 caracteres'),
    body('password').custom(function (value, { req}) {
    if (req.body.confirmpassword == value) {
        return true
    }
    return false
}).withMessage('Las contraseñas no coinciden')
]
};