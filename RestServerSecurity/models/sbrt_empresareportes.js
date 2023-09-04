const { Schema, model } = require('mongoose');

const SBRT_EmpresaReportesSchema = Schema({
    Ere_Id: {
        type: Number,
    },
    Emp_Id: {
        type: Number,
        required: [true, 'The Emp_Id is mandatory'],
    },
    Ere_NombreReporte: {
        type: String,
        required: [true, 'The Ere_NombreReporte is mandatory'],
        
    },
    Ere_Url_reporte: {
        type: String,
        required: [true, 'The Ere_Url_reporte is mandatory'],
        
    },
    Ere_Estado: {
        type: Boolean,
        default: true
    },

});
SBRT_EmpresaReportesSchema.methods.toJSON = function() {
    const { __v,_id, ...empresaReportes  } = this.toObject();
   
    return empresaReportes;
}


module.exports = model( 'SBRT_EmpresaReporte', SBRT_EmpresaReportesSchema ,'SBRT_EmpresaReportes');