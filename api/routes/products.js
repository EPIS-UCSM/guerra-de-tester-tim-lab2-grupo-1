const { Router } = require ('express');
const { check } = require('express-validator');
const { validarCampos, } = require('../middlewares')

const { getProducts, postProduct, deleteProduct } = require('../controllers/product');
const { existeProductoId } = require('../helpers/dbValidator');

const router = Router();

router.get('/', getProducts );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('unidad','La unidad de medida es obligatoria').not().isEmpty(),
    check('proveedor','El proveedor es necesario').not().isEmpty(),
    check('almacen').isNumeric(),
    check('stock').isNumeric(),
    validarCampos //Captura todos los errores y los muestra
], postProduct );

// router.put    ('/:id',[
//     check( 'id','No es un ID valido' ).isNumeric(),
//     check( 'id' ).custom( existeUsuarioId ),
//     validarCampos
// ], putUser )

router.delete ('/:id',[
    check( 'id','No es un ID valido' ).isNumeric(),
    check( 'id' ).custom( existeProductoId ),
    validarCampos
], deleteProduct );

module.exports = router;