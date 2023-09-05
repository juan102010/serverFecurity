const { Schema, model } = require('mongoose');

const SBRT_UsuariosSchema = Schema({
    Ide_Usuario: {
        type: String,
        required: [true, 'The Ide_Usuario is mandatory'],
        unique: true
    },
    Nom_Dependencia: {
        type: String,
        required: [true, 'The Nom_Dependencia is mandatory'],

    },
    Emp_Id: {
        type: Number,
        required: [true, 'The Emp_Id is mandatory'],

    },

});

SBRT_UsuariosSchema.methods.toJSON = function () {
    const { __v, _id, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model('SBRT_Usuario', SBRT_UsuariosSchema, 'SBRT_Usuario');