const { Schema, model } = require('mongoose');

const SBRT_RolPorUsuarioSchema = Schema({
    Ide_Rol: {
        type: Number,
        required: [true, 'The Ide_Rol is mandatory'],
    },
    Ide_Usuario: {
        type: String,
        required: [true, 'The Ide_Usuario is mandatory'],
        unique: true
    }

});
SBRT_RolPorUsuarioSchema.methods.toJSON = function () {
    const { __v, _id, ...rolPorUsuario } = this.toObject();

    return rolPorUsuario;
}


module.exports = model('SBRT_RolPorUsuarios', SBRT_RolPorUsuarioSchema, 'SBRT_RolPorUsuario');