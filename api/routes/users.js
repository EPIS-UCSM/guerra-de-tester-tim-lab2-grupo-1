const { Router } = require ('express');
const { check } = require('express-validator');

const { getUser, postUser } = require('../controllers/users');
const { validarCampos, } = require('../middlewares')
const { existeUsuario, existeAlmacenId } = require ('../helpers/dbValidator')

const router = Router();

router.get('/', getUser );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('usuario','El nombre de usuario es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y de mas de 8 letras').isLength({ min: 8 }),
    check('almacen','El almacen es obligatorio').not().isEmpty(),
    check('almacen').isNumeric(), //Id del almacen
    check('usuario').custom(existeUsuario), //Validar que el usuario enviado no exista ya en la base de datos
    check('almacen').custom(existeAlmacenId), //Validar que el id del almacen exista en la base de datos
    validarCampos //Captura todos los errores y los muestra
], postUser );

module.exports = router;