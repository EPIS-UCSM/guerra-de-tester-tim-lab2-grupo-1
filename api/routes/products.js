const { Router } = require ('express');
const { check } = require('express-validator');
const { validarCampos, } = require('../middlewares')

const { getProducts, postProduct, deleteProduct, putStock, putProduct } = require('../controllers/product');
const { existeProductoId, existeAlmacenId } = require('../helpers/dbValidator');

const router = Router();

router.get('/', getProducts );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','El campo debe ser una cadena de texto').isString(),
    check('unidad','La unidad de medida es obligatoria').not().isEmpty(),
    check('proveedor','El proveedor es necesario').not().isEmpty(),
    check('almacen').isNumeric(),
    check('stock').isNumeric(),
    check('precio').isNumeric(),
    validarCampos //Captura todos los errores y los muestra
], postProduct );

router.put('/:id',[
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeProductoId ),
    check('nombre','El campo es obligatorio').not().isEmpty(),
    check('descripcion','El campo es obligatorio').not().isEmpty(),
    check('unidad','El campo es obligatorio').not().isEmpty(),
    check('precio','El campo es obligatorio').not().isEmpty(),
    check('precio','El campo debe ser numerico').isNumeric(),
    validarCampos
], putProduct )

router.delete ('/:id',[
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeProductoId ),
    validarCampos
], deleteProduct );

router.put('/',[
    check('producto').isNumeric(),
    check('producto').custom(existeProductoId),
    check('almacen').isNumeric(),
    check('almacen').custom(existeAlmacenId),
    check('cantidad').isNumeric(),
    validarCampos
],putStock)

module.exports = router;