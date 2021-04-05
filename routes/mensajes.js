const {Router} = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const {obtenerChat} = require('../controllers/mensajes')


    
const router = Router();

router.get('/:emisor',validarJWT,obtenerChat);

module.exports = router;    