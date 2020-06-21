const express = require('express');
const router = express.Router();
const path = require('path');

const adminController = require(path.resolve(__dirname, '..', 'controllers', 'adminController'));

router.get('/crud', adminController.crud);
router.get('/formproducto', adminController.formproducto);


module.exports = router;
