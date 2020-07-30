const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const {check,validationResult,body} = require("express-validator");
const bcrypt = require('bcryptjs');

//Requerir el modulo de los controladores
const userController = require(path.resolve(__dirname, '../controllers/userController'));




// tratamiento de guardado imagenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/images/usuarios')); //Aquí deben indicar donde van a guardar la imagen
    },
    filename: function (req, file, cb) {
        cb(null, 'usuario' + '-' + Date.now() + path.extname(file.originalname)); //UNIQID() --- PHP
    }
})

const upload = multer({
    storage
})

// Métodos en nuestros controladores: index - show - edit - delete 
router.get('/login', userController.login);
router.get('/usuarios', userController.index);
router.get('/usuarios/page/2', userController.index2);
router.get('/usuarios/page/3', userController.index3);
router.get('/registro', userController.registro);
router.get('/user/detail/:id', userController.show);
router.get('/user/edit/:id', upload.single('imagen'), userController.edit);
router.put('/user/edit/:id', upload.single('imagen'),
[
    check('nombre').isLength({ min:3, max: 15 }).withMessage('Campo nombre obligatorio'),
    check('apellido').isLength({ min:3, max: 15 }).withMessage('Campo apellido obligatorio'),
    check('email').isEmail({ min: 1 }).withMessage('el formato del mail es erroneo'),
    check('telefono').isLength({ min: 6, max: 15 }).withMessage('el telefono no puede quedar vacío'),
    check('password').isLength({ min: 6, max: 15 }).withMessage('la clave debe ser entre 6 y 15 caracteres'),
    body('password').custom(function (value, { req }) {
    if (req.body.confirmpassword == value) {
        return true
    }
    return false
    }).withMessage('Las contraseñas no coinciden'), 
    body('imagen').custom((value, {req}) =>{
        if(req.file != undefined){
            return true
        }
        return false;
    }).withMessage('Debe elegir un avatar')
], userController.update);
router.get('/user/delete/:id', userController.delete);
router.delete('/user/delete/:id', upload.single('imagen'), userController.destroy);
router.get('/logout',userController.logout);
router.get('/perfil/:id', userController.perfil);
router.get('/user/editperfil/:id', upload.single('imagen'), userController.editperfil);
router.put('/user/editperfil/:id', upload.single('imagen'), userController.updateperfil);

//VIENEN LAS RUTAS POR POST DE LOGIN Y REGISTRO
router.post('/login',[
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min: 6 }).withMessage('La contraseña debe tener minimo 6 caracteres'),
    body('email').custom(function(value){
        //requiero mi archivo JSon de Usuarios
        let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')))
        for(let i =0;i<usuarios.length;i++){
            if (usuarios[i].email == value) {
                return true    
            }
        }
        return false
    }).withMessage('Usuario no Registrado'),
    body('password').custom(function(value){
        //requiero mi archivo JSon de Usuarios
        let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')))
        for(let i =0;i<usuarios.length;i++){
            let passwordC= bcrypt.compareSync(value,usuarios[i].contraseña)
            if (passwordC==true) {
                return true    
            }
        }
        return false
    }).withMessage('Contraseña Incorrecta'),
],userController.getIn);


router.post('/registro', upload.single('imagen'),
[
    check('nombre').isLength({ min: 1 }).withMessage('Campo nombre obligatorio'),
    check('lastname').isLength({min: 1}).withMessage('Campo apellido obligatorio'),
    check('email').isEmail().withMessage('Mail invalido'),
    check('telefono').isLength({ min: 1 }).withMessage('El campo telefono no puede estar vacio'),
    check('password').isLength({ min: 6, max: 15 }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),
    check('confirmpassword').isLength({min: 6, max: 15 }).withMessage('La confirmación de la contraseña debe tener entre 6 y 15 caracteres'),
    body('email').custom(function (value){
        //requiero mi archivo Json Usuario
        let usuarios = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/usuarios.json')))
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email == value) {
                return false;
            }
        }
        return true;
    }).withMessage('Usuario ya se encuentra registrado'),
    body('confirmpassword').custom((value, {req}) =>{
        if(req.body.password == value ){
            return true     
        }else{
            return false
        }    
    }).withMessage('Las contraseñas deben ser iguales'),
    body('imagen').custom((value, {req}) =>{
        if(req.file != undefined){
            return true
        }
        return false;
    }).withMessage('Debe elegir un avatar')
], userController.create);

/*router.put('/user/editperfil/:id', upload.single('imagen'),
    [
        check('nombre').isLength({ min: 1 }).withMessage('Campo nombre obligatorio'),
        check('lastname').isLength({min: 1}).withMessage('Campo apellido obligatorio'),
        check('email').isEmail().withMessage('Mail invalido'),
        check('telefono').isLength({
            min: 1
        }).withMessage('El campo telefono no puede estar vacio'),
        check('password').isLength({
            min: 6,
            max: 15
        }).withMessage('La contraseña debe tener entre 6 y 15 caracteres'),
        check('confirmpassword').isLength({
            min: 6,
            max: 15
        }).withMessage('La confirmación de la contraseña debe tener entre 6 y 15 caracteres'),
         body('confirmpassword').custom((value, {
            req
        }) => {
            if (req.body.password == value) {
                return true
            } else {
                return false
            }
        }).withMessage('Las contraseñas deben ser iguales'),
        body('imagen').custom((value, {
            req
        }) => {
            if (req.file != undefined) {
                return true
            }
            return false;
        }).withMessage('Debe elegir un avatar')
    ], userController.updateperfil);*/


module.exports = router;

