const express = require('express');
const router = express.Router();
const path = require('path');

//Requerir el modulo de los controladores
const productoController = require(path.resolve(__dirname, '../controllers/productoController'));

// Métodos en nuestros controladores: index - show - edit - delete 
router.get('/detalleProducto/:id', productoController.detalle);
router.get('/categoria/:categoria',productoController.categoria);


module.exports = router;
