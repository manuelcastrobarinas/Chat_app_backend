const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt')
const { getUsuarios } = require('../controllers/usuarios')
/*
    path: api/usuarios

 */

const router=Router();

router.get('/',validarJWT, getUsuarios );

module.exports = router;