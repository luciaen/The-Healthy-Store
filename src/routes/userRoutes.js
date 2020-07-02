const express = require('express');
const router = express.Router();
const path = require('path');

//Requerir el modulo de los controladores
const userController = require(path.resolve(__dirname, '../controllers/userController'));

// Métodos en nuestros controladores: index - show - edit - delete 
router.get('/login', userController.login);
router.get('/registro', userController.registro);
router.post('/registro', userController.save);

module.exports = router;