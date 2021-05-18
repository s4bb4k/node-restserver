const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuarioPOST, usuarioPUT, usuarioDELETE } = require('../controllers/usuarios');

// const { validarCampos } = require('../middlewares/validar-campos')
// const { validarJWT } = require("../middlewares/validar-jwt");
// const { esAdminRole , tieneRole } = require("../middlewares/validar-roles");
const { validarCampos, validarJWT, esAdminRole, tieneRole } = require('../middlewares');

const { esRolValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id', ).custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
], usuarioPUT );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe ser mayor a 6').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( emailExiste ),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos,
], usuarioPOST );

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    // esAdminRole,
    // check('id', 'No es un ID valido').isMongoId(),
    // check('id', ).custom( existeUsuarioPorId ),
    validarCampos
], usuarioDELETE);

module.exports = router;
