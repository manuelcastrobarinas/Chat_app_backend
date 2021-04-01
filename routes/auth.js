// path: api/login

const {Router} = require('express');
const { check } = require('express-validator');
const { CrearUsuario,login,renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT} = require('../middlewares/validar-jwt')


const router = Router();

router.post('/new',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'la contraseña es obligatoria').not().isEmpty(),
    check('email','el correo es obligatorio').isEmail(),
    validarCampos
],CrearUsuario);

router.post('/',[
    check('email', 'el nombre es obligatorio').isEmail(),
    check('password', 'la contraseña es obligatoria').not().isEmpty()
],login
);

router.get('/renew',validarJWT,renewToken);

module.exports =router;
