const express = require('express');
const router = express.Router();
const path = require('path');

//Requerir el modulo de los controladores
const productoController = require(path.resolve(__dirname, '../controllers/productoController'));

// Métodos en nuestros controladores: index - show - edit - delete 


router.get('/categoria', productoController.categoria);
router.get('/detalle', productoController.detalle);

module.exports = router;
