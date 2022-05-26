const { Router } = require ('express');
const { check } = require('express-validator');
const { validarCampos, } = require('../middlewares')

const { getProducts, postProduct, deleteProduct, putStock, putProduct } = require('../controllers/product');
const { existeProductoId, existeAlmacenId } = require('../helpers/dbValidator');

const router = Router();

router.get('/:id', getProducts );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','El campo debe ser una cadena de texto').isString(),
    check('unidad','La unidad de medida es obligatoria').not().isNumeric(),
    check('proveedor','El proveedor es necesario').not().isEmpty(),
    check('almacen').isNumeric(),
    check('stock','El stock no puede ser negativo').isInt({ min: 0 }),
    check('precio','El precio no puede ser negativo').isFloat({ min: 0 }),
    validarCampos //Captura todos los errores y los muestra
], postProduct );

router.put('/:id',[
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeProductoId ),
    check('nombre','El campo es obligatorio').not().isEmpty(),
    check('descripcion','El campo es obligatorio').not().isEmpty(),
    check('unidad','El campo es obligatorio').isString(),
    check('precio','El campo es obligatorio').not().isEmpty(),
    check('precio','El campo debe ser numerico y no negativo').isFloat({ min: 0 }),
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
    check('cantidad','La cantidad no puede ser negativa').isInt({ min: 0 }),
    validarCampos
],putStock)

module.exports = router;