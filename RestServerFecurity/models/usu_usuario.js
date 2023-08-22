
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    

    USU_Id: {
        type: Number, 
        
    },
    USU_Nombres: {
        type: String, 
        required: [true, 'El nombre es obligatorio']
    },
    USU_Email: {
        type: String,
        required: [true, 'El USU_Email es obligatorio'],
        unique: true
    },
    USU_Celular: {
        type: String,
    },
    USU_Activo: {
        type: Boolean,
        default: true
    },
    Ide_Usuario: {
        type: String,
        required: [true, 'El Ide_Usuario es obligatorio'],
       
    },
    USU_FechaUltimaActualizacion: {
        type: Date,  
        required: true,
    },
    USU_DigitaSerial: {
        type: Boolean,
        default: false
    },
    
});



UsuarioSchema.methods.toJSON = function() {
    const { __v, ...usuario  } = this.toObject();
    return usuario;
}

module.exports = model( 'USU_Usuario', UsuarioSchema ,'USU_Usuarios');
