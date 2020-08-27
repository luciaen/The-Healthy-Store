const { check, validationResult, body } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;

//const {Product, Category} = require('../database/models/');

const product = db.Product;
module.exports = {

    save: [
        check('categoria').isInt().withMessage("categoria obligatoria"),
        check('nombre').isLength({ min: 5 }).withMessage('Campo nombre obligatorio y debe tener las de 5 caracteres'),
        check('descripcion').isLength({ min: 20 }).withMessage('la descripción es obligatoria y debe tener mas de 20 caracteres'),
        check('stock').isLength({ min: 1 }).withMessage('Debe indicar el stock'),
        check('precio').isLength({ min: 1 }).withMessage('Debe indicar el precio'),
        check('descuento').isLength({ min: 1}).withMessage('Indique si aplica un descuento'),
        check('recomendado').isLength({min: 1}).withMessage('Indique si el producto es recomendado'),
        body('imagen').custom((value, {
                req
            }) => {
                if (req.file != undefined) {
                    return true
                }
                return false;
            }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG'),

            //2DA VALIDACION DONDE SE INDICA CUALES SON LAS EXTENCIONES PERMITIDAS    
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
        check('categoria').isInt().withMessage("categoria obligatoria"),
        check('nombre').isLength({
                min: 5
            }).withMessage('Campo nombre obligatorio y debe tener las de 5 caracteres'),
        check('descripcion').isLength({min: 20 }).withMessage('la descripción es obligatoria y debe tener al menos 20 caracteres'),
        check('stock').isLength({ min: 1 }).withMessage('Debe indicar el stock'),
        check('precio').isLength({min: 1 }).withMessage('Debe indicar el precio'),
        check('descuento').isLength({min: 1 }).withMessage('Indique si aplica un descuento'),
        check('recomendado').isLength({ min: 1 }).withMessage('Indique si el producto es recomendado'),
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
       


    ]
}
