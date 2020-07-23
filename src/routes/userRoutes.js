const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require ('fs')
const { check, validationResult, body } = require('express-validator');
const { compareSync } = require('bcrypt');

//Requerir el modulo de los controladores
const userController = require(path.resolve(__dirname, '../controllers/userController'));

const archivoUsuarios = JSON.parse(fs.readFileSync (path.resolve(__dirname, '..', 'data', 'usuarios.json')));

//Aquí dispongo la información del storage para tratamiento de guardado imagenes
//https://www.npmjs.com/package/multer
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
router.post('/login',[
    check('email').isEmail().withMessage('el formato de mail no es correcto'),
    check('password').isLength({ min: 6 }).withMessage('la contraseña debe tener seis caracteres'),
    body('email').custom((value) => {
        for(let i = 0; i< archivoUsuarios.length; i++){
            if (archivoUsuarios[i].email == value){   
                return true;
            } 
           }
                return false;
       }).withMessage('El usuarion no se encuentra registrado'),


] ,userController.ingresar);
router.get('/usuarios', userController.index);
router.get('/registro', userController.registro);
router.get('/user/detail/:id', userController.show);
router.post('/registro', upload.single('imagen'),[
    check('name').isLength({min:1}).withMessage('el nombre no puede quedar vacío'),
    check('email').isEmail().withMessage('el formato de mail no es correcto'),
    body('email').custom((value) => {
    for(let i = 0; i< archivoUsuarios.length; i++){
        if(archivoUsuarios[i].email == value){
            return false;
        } 
       }
            return true;
   }).withMessage('el correo eléctrónico ya se encuentra registrado'),
  check('password').isLength({ min: 6 }).withMessage('la contraseña debe tener seis caracteres'),
  check('confirm_password').isLength({ min: 6 }).withMessage('la contraseña debe tener seis caracteres'),
  body('confirm_password').custom((value, {req}) =>{
    if(req.body.password == value ){
        return true
    }
        return false
 }).withMessage('Sus contraseñas no son iguales'),
    body('imagen').custom((value, {req}) =>{
    if(req.file != undefined ){
        return true
    }
        return false
 }).withMessage('Su avatar debe tener formato JPG, JPEG o PNG'),
 ],userController.save);
router.get('/user/edit/:id', upload.single('imagen'), userController.edit);
router.put('/user/edit/:id', upload.single('imagen'), userController.update);
router.get('/user/delete/:id', userController.delete);
router.delete('/user/delete/:id', upload.single('imagen'), userController.destroy);
router.get('/logout', userController.logout);


module.exports = router;

