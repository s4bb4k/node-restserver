const jwt = require('jsonwebtoken');
const { response } = require("express");
const Usuario = require('../models/usuario');

const validarJWT = async ( req, res = response, next) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
           msg: 'No hay token en la peticion.'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_KEY );

        // leer el usuario de la base de datos
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existente'
            });
        }

        // verificar si el uid tiene estado en true
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado. false'
            });
        }

        req.usuario = usuario;

        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            msg: 'Token no valido.'
        });

    }


}

module.exports = {
    validarJWT
}
