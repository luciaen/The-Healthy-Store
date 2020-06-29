const express = require('express');
const router = express.Router();
const path = require('path');


const comprasController = require(path.resolve(__dirname , '../controllers/comprasController'));

router.get('compras/envios', comprasController.envios);
router.get('compras/carrito', comprasController.carrito);

module.exports = router;