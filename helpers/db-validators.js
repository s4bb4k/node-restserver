const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw  new Error(`El error ${ rol } no es valido.`)
    }
}

const emailExiste = async ( correo = '' ) => {
    // vericar si el correo existe
    const emailExiste = await Usuario.findOne({ correo });
    if(emailExiste) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    // vericar si el usuario existe
    const usuarioExiste = await Usuario.findById({ id });
    if(!usuarioExiste) {
        throw new Error(`El id: ${ id }, no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}
