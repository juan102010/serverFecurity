const { Schema, model } = require('mongoose');

const SBRT_ModuloSchema = Schema({
    Ide_Modulo: {
        type: Number,
    },
    Ide_Aplicacion: {
        type: Number,
    },
    Des_DescripcionModulo: {
        type: String,
        required: [true, 'The Des_DescripcionModulo is mandatory'],

    }
});
SBRT_ModuloSchema.methods.toJSON = function () {
    const { __v, _id, ...company } = this.toObject();

    return company;
}


module.exports = model('SBRT_Modulo', SBRT_ModuloSchema, 'SBRT_Modulo');