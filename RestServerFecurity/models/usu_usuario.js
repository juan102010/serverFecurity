
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    

    USU_Id: {
        type: Number, 
        
    },
    USU_Nombres: {
        type: String, 
        required: [true, 'The name is required']
    },
    USU_Email: {
        type: String,
        required: [true, 'The USU_Email is mandatory'],
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
        required: [true, 'The Ide_Usuario is mandatory'],
       
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
