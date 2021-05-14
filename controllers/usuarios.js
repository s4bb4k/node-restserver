const { response } = require('express');

const usuariosGet = (req, res = response) => {
    const { nombre, apikey, page = 1, limit } = req.query;
    res.json({
        ok: true,
        nombre,
        apikey,
        page,
        limit
    });
}

const usuarioPOST = (req, res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        ok: true,
        nombre,
        edad
    });
}

const usuarioPUT = (req, res = response) => {
    const id = req.params.id;
    res.json({
        ok: true,
        id
    });
}

const usuarioDELETE = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuarioPOST,
    usuarioPUT,
    usuarioDELETE
}
