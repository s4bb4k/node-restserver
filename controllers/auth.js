const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { googleVerify } = require("../helpers/google-verify");
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({ email });
        if(!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            });
        }

        // si el usuario esta activo
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
           msg: 'Hable con el administrador.'
        });
    }

}

const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { email, nombre, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ email });
        if( !usuario ) {
            // tengo que crearlo
            const data = {
                nombre,
                email,
                password: '--',
                img,
                google: true
            }
            usuario = new Usuario( data );
            await usuario.save();
        }

        // si el usuario en DB
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'hable con el administrador, usuario bloqueado'
            });
        }

        // generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Todo ok! google signin',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(400).json({
            msg: 'Token de Google no es valido'
        });
    }

}

module.exports = {
    login,
    googleSignin
}
