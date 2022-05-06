const { Router } = require ('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { existeAlmacenId } = require('../helpers/dbValidator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.post ('/login',
    check('usuario','El correo es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('almacen','El almacen es obligatorio').not().isEmpty(),
    check('almacen').custom(existeAlmacenId),
    validarCampos
, login )


module.exports = router;