const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const adminController = require(path.resolve(__dirname, '..', 'controllers', 'adminController'));

//Aquí dispongo la información del storage para tratamiento de guardado imagenes
//https://www.npmjs.com/package/multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname, '../../public/images/productos'));    //Aquí deben indicar donde van a guardar la imagen
    },
    filename: function (req, file, cb) {
      cb(null, 'producto' + '-' + Date.now()+ path.extname(file.originalname));      //UNIQID() --- PHP
    }
  })
   
const upload= multer({ storage })

router.get('/admin/buscar', adminController.search);
router.get('/administrar', adminController.index);
router.get('/admin/create', adminController.create);
router.get('/admin/detail/:id',adminController.show);
router.post('/admin/create', upload.single('imagen'), adminController.save);
router.get('/admin/edit/:id',upload.single('imagen'), adminController.edit);
router.put('/admin/edit/:id',upload.single('imagen'), adminController.update);
router.get('/admin/delete/:id',adminController.delete);
router.delete('/admin/delete/:id',upload.single('imagen'), adminController.destroy);
router.get("/search/product",adminController.search);



module.exports = router;
