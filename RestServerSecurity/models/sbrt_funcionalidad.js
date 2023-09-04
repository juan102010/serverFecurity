const { Schema, model } = require('mongoose');

const SBRT_FuncionalidadSchema = Schema({
    Ide_Funcionalidad: {
        type: Number,
    },
    Ide_Modulo: {
        type: Number,
    },
    Ide_Aplicacion: {
        type: Number,
    },
    Des_DescripcionFuncionalidad: {
        type: String,
        required: [true, 'The Des_DescripcionFuncionalidad is mandatory'],
        
    },
    Descripcion: {
        type: String,
        required: [true, 'The Descripcion is mandatory'],
        
    }

});
SBRT_FuncionalidadSchema.methods.toJSON = function() {
    const { __v,_id, ...funcionalidad  } = this.toObject();
   
    return funcionalidad;
}


module.exports = model( 'SBRT_Funcionalidad', SBRT_FuncionalidadSchema ,'SBRT_Funcionalidad');