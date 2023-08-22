const { Schema, model } = require('mongoose');

const SBRT_UsuariosSchema = Schema({
    Ide_Usuario: {
        type: String,
        required: [true, 'El Ide_Usuario es obligatorio'],
        unique: true
    },
    Nom_Dependencia: {
        type: String,
        required: [true, 'El Nom_Dependencia es obligatorio'],
        
    },
    Emp_Id: {
        type: Number,
        required: [true, 'El Emp_Id es obligatorio'],  

    },

});

module.exports = model( 'SBRT_Usuario', SBRT_UsuariosSchema ,'SBRT_Usuario');