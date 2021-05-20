const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const {esAdminRole} = require("../middlewares");
const { validarJWT, validarCampos } = require("../middlewares");

const { crearCategoria, obtenerCategorias, obtenerCatagoria, actualizarCategoria, borrarCategoria } = require("../controllers/categorias");
const { existeCategoriaPorId } = require("../helpers/db-validators");

/**
 *  {{url}}/api/categorias
 */


// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener categorias por id - publico
router.get('/:id', [
    check('id', 'no es un id de Mongo valido.').isMongoId(),
    validarCampos,
    check('id').custom( existeCategoriaPorId )
], obtenerCatagoria );

// crear categoria - privado - cualquiera con token valido
router.post('/', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio.').not().isEmpty(),
    validarCampos
], crearCategoria );

// actualizar categoria - privado - cualquiera con token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'el nombre es obligatorio.').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], actualizarCategoria );

// borrar categoria - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'no es un id de Mongo valido.').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);


module.exports = router;
