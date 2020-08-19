const { check, validationResult, body } = require('express-validator');
const path = require('path');
const db = require('../database/models');
const Op = db.Sequelize.Op;

//const {Product, Category} = require('../database/models/');

const product = db.Product;
module.exports = {

    save: [
        check('categoria').isInt().withMessage("categoria obligatoria"),
        check('nombre').isLength({ min: 1 }).withMessage('Campo nombre obligatorio'),
    ],
    //agregar el metodo q le sigue
}
