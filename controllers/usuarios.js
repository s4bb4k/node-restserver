const { response } = require('express');


const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        ok: true,
        total,
        usuarios
    });
}

const usuarioPOST = async (req, res = response) => {

    const { nombre, email, password, rol } = req.body;
    const usuario = new Usuario({ nombre, email, password, rol });

    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // guardar en bd
    await usuario.save();

    res.json({
        ok: true,
        usuario
    });
}

const usuarioPUT = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    // TODO validar contra base de datos
    if( password ){
        // encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuariodb = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        ok: true,
        usuariodb
    });

}

const usuarioDELETE = async (req, res = response) => {
    const { id } = req.params;
    const usuariodb = await Usuario.findByIdAndUpdate( id, { estado: false } );
    res.json({ ok: true, usuariodb });
}

module.exports = {
    usuariosGet,
    usuarioPOST,
    usuarioPUT,
    usuarioDELETE
}
