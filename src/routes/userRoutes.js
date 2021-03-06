const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const {check,validationResult,body} = require("express-validator");

//Requerir el modulo de los controladores
const userController = require(path.resolve(__dirname, '../controllers/userController'));
// tratamiento de guardado imagenes
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public/images/usuarios')); //indica donde van a guardar la imagen
    },
    filename: function (req, file, cb) {
        cb(null, 'usuario' + '-' + Date.now() + path.extname(file.originalname)); 
    }
})
const upload = multer({
    storage
})

//requiero las validaciones
const validaciones = require(path.resolve(__dirname,"../middlewares/validacionesBackUser"));



// METODOS POR GET -----------------------> 
router.get('/login', userController.login);
router.get('/usuarios', userController.index);
router.get('/registro', userController.registro);
router.get('/user/detail/:id', userController.show);
router.get('/user/edit/:id', upload.single('imagen'),userController.edit);
router.get('/user/delete/:id', userController.delete);
router.get('/logout',userController.logout);
router.get('/perfil', userController.perfil);
router.get('/user/editperfil', upload.single('imagen'), userController.editperfil);
router.get('/user/editPerfilCrud/:id', upload.single('imagen'), userController.editPerfilCrud);
router.get('/usuarios/create',userController.create)
router.get("/search/user",userController.search);
router.get("/user/editpassword",userController.editPassword);
router.get("/user/editPasswordCrud/:id",userController.editPasswordCrud);
router.get("/user/editEmail",userController.editEmail);
router.get("/user/editEmailCrud/:id",userController.editEmailCrud);
router.get('/users/registrados', userController.usuariosregistrados);
 
//METODOS POR POST------------------------>
router.post('/login',validaciones.getIn,userController.getIn);
router.post('/registro', upload.single('imagen'),validaciones.newRegister,userController.newRegister);
router.post('/usuarios/create',upload.single('imagen'),validaciones.newCreate,userController.newCreate)
 
//METODOS POR PUT ------------------------------->

router.put('/user/edit/:id', upload.single('imagen'),validaciones.update,userController.update);
router.put('/user/editperfil/:id', upload.single('imagen'),validaciones.updatePerfil,userController.updateperfil);
router.put('/user/editperfilCrud/:id', upload.single('imagen'),validaciones.updatePerfil,userController.updateperfilCrud);
router.put("/user/editpassword/:id",validaciones.editPassword,userController.updatePassword);
router.put("/user/editPasswordCrud/:id",validaciones.editPasswordCrud,userController.updatePasswordCrud);
router.put("/user/editEmail/:id",validaciones.editEmail,userController.updateEmail);
router.put("/user/editEmailCrud/:id",validaciones.editEmail,userController.updateEmailCrud);

//METODOS POR DELETE ------------------------>
router.delete('/user/delete/:id', upload.single('imagen'),userController.destroy);


module.exports = router;

