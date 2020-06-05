//Requerimos siempre express
const express = require('express');
const router = express.Router();
const path = require('path');

//Aca vamos a empezar a requerir todos los controladores.

const pruebaController = require(path.resolve(__dirname, '../controllers/pruebaController'));



// aca empezamos con los Metodos de los controladores.

router.get('/', pruebaController.index);







// Aca exportamos Router
module.exports = router;