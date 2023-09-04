const { Schema, model } = require('mongoose');

const SBRT_AplicacionSchema = Schema({
    Ide_Aplicacion: {
        type: Number,
    },
    Des_DescripcionAplicacion: {
        type: String,
        required: [true, 'The Des_DescripcionAplicacion is mandatory'],
        
    },
    Est_Habilitado: {
        type: Boolean,
        default: true
    }
});
SBRT_AplicacionSchema.methods.toJSON = function() {
    const { __v,_id, ...aplicacion  } = this.toObject();
   
    return aplicacion;
}


module.exports = model( 'SBRT_Aplicaciones', SBRT_AplicacionSchema ,'SBRT_Aplicacion');