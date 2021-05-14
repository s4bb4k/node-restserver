const { Router } = require('express');
const { usuariosGet, usuarioPOST, usuarioPUT, usuarioDELETE } = require('../controllers/usuarios');
const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuarioPUT);

router.post('/', usuarioPOST);

router.delete('/', usuarioDELETE);

module.exports = router;
