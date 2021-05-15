const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let RoleSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio.'],
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

module.exports = mongoose.model( 'Role', RoleSchema);
