const express = require('express');
const router = express.Router();
const path = require('path');

//Requerir el modulo de los controladores
const productoController = require(path.resolve(__dirname, '../controllers/productoController'));

// Métodos en nuestros controladores: index - show - edit - delete 
router.get('/', productoController.index);
router.get('/about', productoController.about);
router.get('/promos', productoController.promos);
router.get('/contacto', productoController.contacto);
router.get('/preguntasfrec', productoController.preguntasfrec);
router.get('/envios', productoController.envios);
router.get('/carrito', productoController.carrito);
router.get('/categoria-productos', productoController.categoria);
router.get('/detalle-producto', productoController.detalle);

module.exports = router;
