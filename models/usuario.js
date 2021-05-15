const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UsuarioSchema = new Schema({
        nombre: {
            type: String,
            required: [true, 'El nombre es obligatorio']
        },
        email: {
            type: String,
            required: [true, 'El correo es obligatorio'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'La constraseña es obligatoria']
        },
        img: {
            type: String
        },
        rol: {
            type: String,
            required: true,
            enum: ['ADMIN_ROLE', 'USER_ROLE']
        },
        estado: {
            type: Boolean,
            default: true
        },
        google: {
            type: Boolean,
            default: false
        },
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = mongoose.model( 'Usuario', UsuarioSchema);
