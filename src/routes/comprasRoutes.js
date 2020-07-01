const express = require('express');
const router = express.Router();
const path = require('path');

const carritoController= require(path.resolve(__dirname, '..', 'controllers', 'carritoController'));

router.get('/carrito',carritoController.carrito);
router.get('/envios',carritoController.envios);



module.exports = router;