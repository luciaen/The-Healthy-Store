const { check, validationResult, body } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;

//const {Product, Category} = require('../database/models/');

const product = db.Product;
module.exports = {

    save: [
        check('categoria').isInt().withMessage("categoria obligatoria"),
        check('nombre').isLength({ min: 5 }).withMessage('Campo nombre obligatorio'),
        check('descripcion').isLength({ min: 20 }).withMessage('la descripción es obligatoria'),
        check('stock').isLength({ min: 1 }).withMessage('Debe indicar el stock'),
        check('precio').isLength({ min: 1 }).withMessage('Debe indicar el precio'),
        check('descuento').isLength({ min: 1}).withMessage('Indique si aplica un descuento'),
        check('recomendado').isLength({min: 1}).withMessage('Indique si el producto es recomendado')
       /*, body('imagen').custom(function (value, {
            req
        }) {
            let ext
            if (req.file != undefined) {
                return true
            } else {
                ext = "" + path.extname(req.files[0].filename).toLowerCase();
            }
            //console.log(ext);
            if (
                ext == ".jpg" ||
                ext == ".jpeg" ||
                ext == ".png" ||
                ext == ".gif") {
                return true;
            }
            return false;
        }).withMessage('Solo debe seleccionar archivos  con extensión JPG, JPEG, PNG o GIF')*/
    ],
    //agregar el metodo q le sigue
    update: [
        check('categoria').isInt().withMessage("categoria obligatoria"),
        check('nombre').isLength({ min: 5 }).withMessage('Campo nombre obligatorio'),
        check('descripcion').isLength({min: 20 }).withMessage('la descripción es obligatoria'),
        check('stock').isLength({ min: 1 }).withMessage('Debe indicar el stock'),
        check('precio').isLength({min: 1 }).withMessage('Debe indicar el precio'),
        check('descuento').isLength({min: 1 }).withMessage('Indique si aplica un descuento'),
        check('recomendado').isLength({ min: 1 }).withMessage('Indique si el producto es recomendado')
       


    ]
}
