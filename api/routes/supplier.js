const { Router } = require ('express');
const { check } = require('express-validator');
const { getSupplier, postSupplier, putSupplier, deleteSupplier } = require('../controllers/supplier');
const { existeProveedorId } = require('../helpers/dbValidator');
const { validarCampos, } = require('../middlewares')


const router = Router();

router.get('/', getSupplier );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre').isString(),
    check('direccion','El campo direccion debe ser una cadena de texto valida').isString(),
    validarCampos //Captura todos los errores y los muestra
], postSupplier );

router.put('/:id',[
    check('id').isNumeric(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre','El nombre debe ser una cadena de texto').isString(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('direccion','La direccion debe ser una cadena de texto').isString(),
    check('id').custom(existeProveedorId),
    validarCampos
], putSupplier );

router.delete('/:id',[
    check('id').isNumeric(),
    check('id').custom(existeProveedorId),
    validarCampos
],deleteSupplier);
module.exports = router;