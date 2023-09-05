const { Schema, model } = require('mongoose');

const SBRT_RolSchema = Schema({
    Ide_Rol: {
        type: Number,
    },
    Des_DescripcionRol: {
        type: String,
        required: [true, 'The Des_DescripcionRol is mandatory'],

    },
    Est_Habilitado: {
        type: Boolean,
        default: true
    },
    Emp_Id: {
        type: Number,
        required: [true, 'The Emp_Id is mandatory'],

    },

});
SBRT_RolSchema.methods.toJSON = function () {
    const { __v, _id, ...rol } = this.toObject();

    return rol;
}


module.exports = model('SBRT_Roles', SBRT_RolSchema, 'SBRT_Rol');