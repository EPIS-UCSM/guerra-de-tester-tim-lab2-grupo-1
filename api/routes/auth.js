const { Router } = require ('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post ('/login',
    check('usuario','El correo es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
, login )


module.exports = router;