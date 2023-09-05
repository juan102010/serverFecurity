const { Schema, model } = require('mongoose');

const SBRT_FuncionalidadPorRolSchema = Schema({
    Ide_Funcionalidad: {
        type: Number,
    },
    Ide_Module: {
        type: Number,
        required: [true, 'The Ide_Module is mandatory'],
    },
    Ide_Aplicacion: {
        type: Number,
        required: [true, 'The Ide_Aplicacion is mandatory'],
    },
    Ide_Rol: {
        type: Number,
        required: [true, 'The Ide_Rol is mandatory'],
    },


});
SBRT_FuncionalidadPorRolSchema.methods.toJSON = function () {
    const { __v, _id, ...funcionalidadPorRol } = this.toObject();

    return funcionalidadPorRol;
}


module.exports = model('SBRT_FuncionalidadPorRol', SBRT_FuncionalidadPorRolSchema, 'SBRT_FuncionalidadPorRol');