const { Schema, model } = require('mongoose');

const SBRT_EmpresaSchema = Schema({
    Emp_Id: {
        type: Number,
    },
    Emp_Nombre: {
        type: String,
        required: [true, 'The Emp_Nombre is mandatory'],

    },
    Emp_Esquema: {
        type: String,
        required: [true, 'The Emp_Esquema is mandatory'],

    },
    Emp_Estado: {
        type: Boolean,
        default: true
    },
    Emp_Descripcion: {
        type: String,
        required: [true, 'The Emp_Descripcion is mandatory'],
    },
    Emp_UrlEsquema: {
        type: String,
    }
});
SBRT_EmpresaSchema.methods.toJSON = function () {
    const { __v, _id, ...company } = this.toObject();

    return company;
}


module.exports = model('SBRT_Empresa', SBRT_EmpresaSchema, 'SBRT_Empresa');