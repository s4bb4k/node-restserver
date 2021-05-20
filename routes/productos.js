const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {esAdminRole} = require("../middlewares");
const { validarJWT, validarCampos } = require("../middlewares");

const {
            crearProducto,
            obtenerProductos,
            obtenerProducto,
            actualizarProducto,
            borrarProducto
    } = require("../controllers/productos");
const { existeCategoriaPorId, existeProductoPorId } = require("../helpers/db-validators");

/**
 *  {{url}}/api/productos
 */

router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'no es un id de Mongo valido.').isMongoId(),
    validarCampos,
    check('id').custom( existeProductoPorId )
], obtenerProducto );

router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( existeCategoriaPorId ),
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    // check('categoria', 'no es un id de mongo.').isMongoId,
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto );

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'no es un id de Mongo valido.').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);


module.exports = router;
