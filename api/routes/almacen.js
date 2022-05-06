const { Router } = require ('express');
const { check } = require('express-validator');

const { getAlmacen, postAlmacen, putAlmacen, deleteAlmacen } = require('../controllers/almacen');
const { existeAlmacenId } = require('../helpers/dbValidator');
const { validarCampos, } = require('../middlewares')


const router = Router();

router.get('/', getAlmacen );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').isString(),
    check('direccion','El campo direccion debe ser una cadena de texto valida').isString(),
    validarCampos //Captura todos los errores y los muestra
], postAlmacen );

router.put('/:id',[
    check('id').isNumeric(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').isString(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('direccion').isString(),
    check('id').custom(existeAlmacenId),
    validarCampos
], putAlmacen );

router.delete('/:id',[
    check('id').isNumeric(),
    check('id').custom(existeAlmacenId),
    validarCampos
],deleteAlmacen);

module.exports = router;