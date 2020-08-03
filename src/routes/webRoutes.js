const express = require('express');
const router = express.Router();
const path = require('path');

const webController= require(path.resolve(__dirname, '..', 'controllers', 'webController'));


router.get('/',webController.home);
router.get('/index',webController.index);
router.get('/about',webController.about);
router.get('/promos',webController.promos);
router.get('/contacto',webController.contacto);
router.get('/preguntasfrec',webController.preguntasfrec);


module.exports = router;