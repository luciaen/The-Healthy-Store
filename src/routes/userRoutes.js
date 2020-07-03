const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

//Requerir el modulo de los controladores
const userController = require(path.resolve(__dirname, '../controllers/userController'));

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

router.get('/registro', userController.registro);
router.post('/registro',userController.save);


module.exports = router;

